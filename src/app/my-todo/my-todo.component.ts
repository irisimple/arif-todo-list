import { Component, OnInit, AfterViewInit, ViewChild, ElementRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-todo',
  templateUrl: './my-todo.component.html',
  styleUrls: ['./my-todo.component.css']
})
export class MyTodoComponent implements OnInit {
  user:IUser;
  model:any ={};
  image: any;
  fName: any;
  @ViewChild('mapContainer') gmap: ElementRef;
  map: google.maps.Map;
  lat = 23.769406;
  lng = 90.3667548;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8
  };
  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
    draggable:true,
    animation: google.maps.Animation.DROP
  });
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.user = {
      name: 'User',
      email:'user@mail.com',
      image: 'istockphoto-943956044-170667a.png'

    }
    this.mapInitializer();
  }
  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);
    google.maps.event.addListener(this.marker,"dragend", function(marker){
      let latLg = marker.latLng;
      let lat = latLg.lat();
      let lg = latLg.lng();
      alert('lat: '+lat+ '  long: '+ lg);
      let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lg+'&key=AIzaSyD7JM1eAv6kiTVeD1pYR0Ua2L9oDuZ8sbw';
      alert(url);
      console.log(url);
      this.http.get(url).subscribe((result: any) => {
        alert();
        console.log(result.results[0].formatted_address);
      }, error=>
      {
        alert('err');
        console.log(error)
      })

    });
  }
  addUser(model: any){
    this.user = {
       name: model.name,
       email: model.email,
       image: this.fName
    };
  }
  validateFileUpload(file: File) {
    if (file) {
      const fileName = file.name;
      this.fName = fileName; 
      const fileSize = file.size;
      const allowedFile = '.png';
      console.log(fileName);
      if (fileName.substr(fileName.length - allowedFile.length,
        allowedFile.length).toLowerCase() !== allowedFile.toLowerCase()) {
        return 'invalidFileFormat';
      }
      if (fileSize > 1024000) {
        return 'invalidFileSize';
      }
    }
    return 'fileOk';
  }
  onSelectedImage(event) {
    const f = event.target.files[0];
    const result = this.validateFileUpload(f);
    if (result === 'invalidFileFormat') {
      alert('Invalid File Format');
      return;
    }
    if (result === 'invalidFileSize') {
      alert('Invalid File Size');
      return;
    }
    if (result === 'fileOk') {
      this.image = f;
    }
  }
}

interface IUser{
  name: string;
  email: string;
  image: string;
}
