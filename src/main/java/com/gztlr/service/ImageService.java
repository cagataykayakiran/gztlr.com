package com.gztlr.service;

import com.gztlr.dto.image.ImageResponse;
import com.gztlr.entity.ImageData;
import com.gztlr.exception.image.ImageException;
import com.gztlr.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageRepository repository;

/*
    public String saveImageFromUrl(String imageUrl) {
        try {
            // Resmi URL'den indir
            byte[] imageBytes = downloadImageBytesFromUrl(imageUrl);

            //StreamUtils.copyToByteArray(new URL(imageUrl).openStream());


            // Resmi bilgisayarınıza kaydet (PNG formatında)
            String localImagePath = FOLDER_PATH + System.currentTimeMillis() + ".png"; // Yolu uygun şekilde değiştirin
            try (FileOutputStream fos = new FileOutputStream(localImagePath)) {
                fos.write(imageBytes);
            }


            // Resmin bilgilerini veritabanına kaydet
            ImageData imageEntity = new ImageData();
            imageEntity.setImagePath(localImagePath);
            imageEntity.setName(getImageNameFromUrl(imageUrl));
            imageEntity.setImageBytes(imageBytes);
            repository.save(imageEntity);

            return localImagePath;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }*/

    /*
        public static byte[] downloadImageBytesFromUrl(String imageUrl) throws IOException {
            URL url = new URL(imageUrl);
            URLConnection connection = url.openConnection();

            try (InputStream inputStream = connection.getInputStream()) {
                ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                byte[] buffer = new byte[1024];
                int bytesRead;

                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    byteArrayOutputStream.write(buffer, 0, bytesRead);
                }

                return byteArrayOutputStream.toByteArray();
            }
        }

        public String getImageNameFromUrl(String imageUrl) {
            try {
                URL url = new URL(imageUrl);

                // URL'nin path kısmını al
                String path = url.getPath();

                // Path'ten dosya adını çıkar
                return Paths.get(path).getFileName().toString();
            } catch (MalformedURLException e) {
                e.printStackTrace();
                return null;
            }
        }
    */

    public String findByName(String fileName) {
        System.out.println(fileName);
        ImageData imageData = repository.findByName(fileName);
        if (imageData == null) {
            throw new ImageException("file not found");
        }
        return imageData.getImagePath();
    }

    public ImageResponse uploadImage(MultipartFile file, Optional<String> folder) throws IOException {
        if (file.isEmpty()) {
            throw new ImageException("file is empty");
        }
        if (!isImage(file)) {
            throw new ImageException("Unsupported file");
        }
        if (!isImageFile(file)) {
            throw new ImageException("Unsupported file");
        }
        if (!verifyImage(file)) {
            throw new ImageException("Unsupported file");
        }
        String fileName = file.getOriginalFilename();
        String folderPath = folder.map(f-> "src/main/resources/public/" + folder).orElse("src/main/resources/public/");
        File imageDirectory = new File(folderPath);
        byte[] fileBytes = StreamUtils.copyToByteArray(file.getInputStream());
        // Eğer dizin yoksa oluştur
        if (!imageDirectory.exists()) {
            imageDirectory.mkdirs();
        }
        File imageFile = new File(imageDirectory, fileName);
        // Byte dizisini dosyaya yaz
        Files.write(imageFile.toPath(), fileBytes);
        ImageData imageData = repository.save(ImageData.builder()
                .name(file.getOriginalFilename())
                .imagePath("image/" + fileName)
                .imageType(file.getContentType())
                .build());
        ArrayList<ImageData> hm = new ArrayList<>();
        hm.add(imageData);
        return ImageResponse
                .builder()
                .data(hm)
                .build();//cast method yazılabilir
    }

    private boolean isImageFile(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        if (fileName.endsWith(".jpg") || fileName.endsWith(".svg") || fileName.endsWith(".png")) {
            return true;
        }
        return false;
    }

    private boolean isImage(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("image/");
    }

    private boolean verifyImage(MultipartFile file) {
        try {
            BufferedImage image = ImageIO.read(file.getInputStream());
            if (image == null) {
                System.out.println("Desteklenmeyen format veya resim değil");
                return false;
            }
            System.out.println("Resim başarıyla okundu");
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    public String deleteById(Long id) {
        Optional<ImageData> optionalImageData = repository.findById(id);

        if (optionalImageData.isPresent()) {
            ImageData imageData = optionalImageData.get();

            // Veritabanından silme işlemi
            repository.deleteById(id);

            // Dosya sisteminden silme işlemi
            String folderPath = "src/main/resources/public/deneme/"; // Klasör yolu uygun şekilde değiştirilmelidir
            String imagePath = imageData.getImagePath();

            try {
                Path fullPath = Paths.get(folderPath, imagePath);
                System.out.println(fullPath);
                Files.delete(fullPath);
                return "Dosya ve veritabanı kaydı başarıyla silindi.";
            } catch (IOException e) {
                // Dosya silme işlemi sırasında bir hata oluştuğunda
                throw new RuntimeException("Dosya silinirken bir hata oluştu.", e);
            }
        } else {
            // Belirtilen id ile eşleşen bir ImageData bulunamadı
            return "Dosya bulunamadı.";
        }
    }
}
