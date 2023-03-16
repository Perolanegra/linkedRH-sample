import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppControllerService {

  constructor(private loadingCtrl: LoadingController,
    private router: Router,
    private alertController: AlertController
  ) { }

  async showLoadingWDuration() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
      duration: 5000,
      cssClass: 'custom-loading',
    });

    loading.present();
  }

  async showLoading(): Promise<any> {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
      duration: 5000,
      cssClass: 'custom-loading',
    });

    loading.present();
    return loading;
  }

  /**
 * @author igor.alves
 * @param path Recebe uma string como parâmetro que faz referência a rota a ser navegada.
 * @description Retorna para uma nova rota de navegação.
 */
  public navigate(path: string): void {
    const instanceL = this.showLoading();
    this.router
      .navigate(["/" + path])
      .catch((error) => console.log("error: ", error))
      .finally(() => instanceL.then(i => i.remove()));
  }

  public navigateWithParams(path: string, params: any): void {
    const instanceL = this.showLoading();
    const pToString = JSON.stringify(params);
    this.router
      .navigate(["/" + path, { params: pToString }])
      .catch((error) => console.log("error: ", error))
      .finally(() => instanceL.then(i => i.remove()));
  }

  async presentAlert({ title, msg, subtitle, btns }: any) {
    const alert = await this.alertController.create({
      header: title,
      subHeader: subtitle,
      message: msg,
      buttons: btns,
    });

    await alert.present();
  }

  isObjectEmpty = (objectName: any) => {
    return Object.keys(objectName).length === 0;
  };
}
