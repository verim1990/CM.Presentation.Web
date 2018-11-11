import { Injectable } from '@angular/core';

@Injectable()
export class MathService {
    getDistance(
        coordinates1: { longitude: number; latitude: number },
        coordinates2: { longitude: number; latitude: number }) {
        const degreesToRadians = (degrees: number) => {
            return degrees * Math.PI / 180;
        };

        const earthRadiusKm = 6371;
        const diffLat = degreesToRadians(coordinates2.latitude - coordinates1.latitude);
        const diffLon = degreesToRadians(coordinates2.longitude - coordinates1.longitude);
        const lat1 = degreesToRadians(coordinates1.latitude);
        const lat2 = degreesToRadians(coordinates2.latitude);

        const a = Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
            Math.sin(diffLon / 2) * Math.sin(diffLon / 2) *
            Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return earthRadiusKm * c;
    }

}
