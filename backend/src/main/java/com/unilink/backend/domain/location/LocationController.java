package com.unilink.backend.domain.location;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.unilink.backend.domain.location.dto.ReverseGeocodeResponse;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/location")
@RequiredArgsConstructor
public class LocationController {
    private final LocationService locationService;

    @GetMapping("/reverse-geocode")
    public ResponseEntity<ReverseGeocodeResponse> reverseGeocode(
            @RequestParam(name = "latitude") @NotNull @DecimalMin("-90.0") @DecimalMax("90.0") Double latitude,
            @RequestParam(name = "longitude") @NotNull @DecimalMin("-180.0") @DecimalMax("180.0") Double longitude) {
        String address = locationService.reverseGeocode(latitude, longitude);
        return ResponseEntity.ok(new ReverseGeocodeResponse(address));
    }
}