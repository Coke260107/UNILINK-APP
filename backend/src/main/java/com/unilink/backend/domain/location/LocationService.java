package com.unilink.backend.domain.location;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;

@Service
public class LocationService {

    @Value("${naver.client-id}")
    private String clientId;

    @Value("${naver.client-secret}")
    private String clientSecret;

    private final RestClient restClient = RestClient.create();

    @SuppressWarnings("unchecked")
    public String reverseGeocode(double latitude, double longitude) {
        Map<String, Object> response = (Map<String, Object>) restClient.get()
                .uri("https://maps.apigw.ntruss.com/map-reversegeocode/v2/gc"
                        + "?coords={lng},{lat}&sourcecrs=epsg:4326&output=json&orders=admcode",
                        longitude, latitude)
                .header("X-NCP-APIGW-API-KEY-ID", clientId)
                .header("X-NCP-APIGW-API-KEY", clientSecret)
                .retrieve()
                .body(Map.class);

        return parseAddress(response);
    }

    @SuppressWarnings("unchecked")
    private String parseAddress(Map<String, Object> response) {
        List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");

        if (results == null || results.isEmpty()) {
            throw new RuntimeException("주소를 찾을 수 없습니다.");
        }

        Map<String, Object> region = (Map<String, Object>) results.get(0).get("region");

        String area1 = getAreaName(region, "area1");
        String area2 = getAreaName(region, "area2");
        String area3 = getAreaName(region, "area3");

        return (area1 + " " + area2 + " " + area3).trim();
    }

    @SuppressWarnings("unchecked")
    private String getAreaName(Map<String, Object> region, String areaKey) {
        Map<String, Object> area = (Map<String, Object>) region.get(areaKey);
        if (area == null) return "";
        String name = (String) area.get("name");
        return name != null ? name : "";
    }
}