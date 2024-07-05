import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  public lat!:any;
  public lng!:any;
  address= '';
  key = 'AIzaSyDAYHC-cMrxWQd5LSta5kfssFpnbqI-IYo';
  
  constructor(private http:HttpClient){
    this.getLocation();
    
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          console.log('lo', position)
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(this.lat);
          console.log(this.lat);
          setTimeout(()=>{
            //this.getAddress(this.lat,this.lng);
          },1000)
         
        }
      },
        (error: any) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
//   getGeoLocation(address: string): Observable<any> {
//     console.log('Getting address: ', address);
//     let geocoder = new google.maps.Geocode();
//     return Observable.create(observer => {
//         geocoder.geocode({
//             'address': address
//         }, (results, status) => {
//             if (status == google.maps.GeocoderStatus.OK) {
//                 observer.next(results[0].geometry.location);
//                 observer.complete();
//             } else {
//                 console.log('Error: ', results, ' & Status: ', status);
//                 observer.error();
//             }
//         });
//     });
// }
getAddress(lat: number, lng: number): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http
      .get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.key}`
      )
      .pipe(
        map((geoData) => {
          if (!geoData || !geoData.results || geoData.results.length === 0)
            throw null;
          return geoData.results[0];
        })
      )
      .subscribe(
        (data) => {
          console.log('address',data.formatted_address);
          resolve(data);
          this.address = data.formatted_address;
        },
        (e) => {
          reject(e);
        }
      );
  });
}
}
