import { Component } from '@angular/core';

@Component({
    selector: 'ngx-footer',
    styleUrls: ['./footer.component.scss'],
    template: `
    <span class="created-by">Created with ♥ by <b><a href="https://rickithadi.com" target="_blank">Hadi Rickit</a></b> 2017</span>
    <div class="socials">
      <a href="https://github.com/rickithadi" target="_blank" class="ion ion-social-github"></a>
      <a href="https://linkedin.com/in/hadi-rickit" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
