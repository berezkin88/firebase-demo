import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  courses$;
  course$;
  author$;

  constructor(private db: AngularFireDatabase) {
    this.courses$ = db.list('/courses').snapshotChanges();
    this.course$ = db.object('/courses/-MJDugK3-phwmJtIFmnY').snapshotChanges()
      .subscribe(course => console.log(course));
    this.author$ = db.object('/authors/1').valueChanges();
  }

  add(course: HTMLInputElement) {
    this.db.list('/courses').push({
      name: course.value,
      price: 150,
      isLive: true,
      sections: [
        { title: 'Components' },
        { title: 'Directives' },
        { title: 'Templates' }
      ]
    });
    course.value = '';
  }

  update(course) {
    console.log(course);
    this.db.object('/courses/' + course.key)
      .set({
        title: 'New Title',
        isLive: true
      });
  }

  delete(course) {
    this.db.object('/courses/' + course.key)
      .remove()
      .then(x => console.log('Deleted'));
  }
}
