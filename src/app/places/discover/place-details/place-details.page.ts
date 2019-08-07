import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.page.html',
  styleUrls: ['./place-details.page.scss'],
})
export class PlaceDetailsPage implements OnInit {
  place: Place;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('placeId')){
          this.navCtrl.navigateBack('/places/tabs/discover');
          return;
      }
      this.place = this.placesService.getPlace(paramMap.get('placeId'));
    });
  }
  onBookPlace(){
    this.actionSheetCtrl.create({
      header: 'Choose An Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () =>{
            this.openBookingModel('select');
          }

        },
        {
          text: 'Random Date',
          handler: () =>{
            this.openBookingModel('random');

          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present();
    });
 // this.router.navigateByUrl('/places/tabs/discover');
    // this.navCtrl.navigateBack('/places/tabs/discover');
    // this.navCtrl.pop();

  }
  openBookingModel(mode: 'select' | 'random'){
    console.log(mode);
    this.modalCtrl.create({
      component: CreateBookingComponent,
      componentProps: { selectedPlace: this.place }
    }).then(modalEl => {
      modalEl.present();
       return modalEl.onDidDismiss();
    }).then(resultData => {
      console.log(resultData.data, resultData.role);
      if(resultData.data === 'confirm'){
        console.log('Booked !!!');

      }
    });


  }
}
