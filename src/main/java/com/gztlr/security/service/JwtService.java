package com.gztlr.security.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
public class JwtService {

    @Value("${jwt.key}")
    private String SECRET;
    @Value("${access.token.expiration}")
    private long jwtExpiration;
    @Value("${refresh.token.expiration}")
    private long refreshExpiration;

    public Boolean validateToken(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        Date exprationDate = extractDate(token);
        return userDetails.getUsername().equals(username) && !exprationDate.before(new Date());
    }
    public String extractUsername(String token) {
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }
    public Date extractDate(String token) {
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getExpiration();
    }
    public String generateToken(String username) {
        Map<String, Objects> claims = new HashMap<>();
        return createToken(username, claims, jwtExpiration);
    }

    public String generateRefreshToken(String username) {
        return createToken(username, new HashMap<>(), refreshExpiration);
    }
    private String createToken(String username, Map<String, Objects> claims, long expiration) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public long getJwtExpiration() {
        return jwtExpiration/1000;
    }
}
