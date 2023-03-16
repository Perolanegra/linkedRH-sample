import { StorageService } from './../../core/storage.service';
import { AppControllerService } from '../../core/app-controller.service';
import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import packageInfo from '../../../../package.json';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public version: string = packageInfo.version;

  constructor(private hs: HomeService,
    private appController: AppControllerService,
    private storage: StorageService
  ) { }

  userData$ = this.getData();
  dataFromRequest = [];

  ngOnInit(): void {
    this.storage.bootStorageReference('l');
  }

  getData() {
    this.appController.showLoadingWDuration();
    return this.hs.getMock()
      .pipe(
        map(input => input.payload.filter(p => p.sections)[0].sections),
        map((data: Array<any>) => {
          this.dataFromRequest = JSON.parse(JSON.stringify(data));
          return data.find(d => d.name === 'Dados de identificação').cardItems.find((c: any) => {
            return { name: c.data.employeeName, job: c.data.jobName }
          })?.data;
        }),
      )
  }

  onHomeBtnClick(state: string): void {
    const literals = {
      'details': '/collaborator',
      'update': this.hs.getFromApi().pipe()
    } as any;

    if (typeof literals[state] === 'string') {
      this.appController.navigateWithParams(literals[state], { request: this.dataFromRequest });
      return;
    }

    const instanceL = this.appController.showLoading();
    literals[state]
      .subscribe((data: any) => {
        this.storage.store('state', data);
        const payload = {
          title: 'Sucesso',
          subtitle: `Versão ${this.version}`,
          msg: 'App atualizado com sucesso.',
          btns: ['OK']
        }
        this.appController.presentAlert(payload);
        instanceL.then(i => i.remove());
      });

  }
}
