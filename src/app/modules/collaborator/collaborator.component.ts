import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collaborator',
  templateUrl: 'collaborator.component.html',
  styleUrls: ['collaborator.component.scss'],
})
export class CollaboratorComponent {
  params!: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.params = JSON.parse(this.route.snapshot.paramMap.get('params') as any);
  }

}
