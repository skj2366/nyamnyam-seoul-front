import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TestService } from 'src/app/test.service';
import { ActivatedRoute, Router } from '@angular/router';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.css']
})
export class ReceiveComponent implements OnInit {

  private subscription: Subscription;

  // public Editor = ClassicEditor;

  ckData = '';
  EditorConfig = {
    toolbar : [
      'heading', '|', 'bold', 'italic'
    ],
    image : {
      toolbar : [
        'imageStyle:full'
      ]
    }
  }

  // ckconfig = {
  //   // include any other configuration you want
  //   extraPlugins: [ this.TheUploadAdapterPlugin ]
  // };

  // ckconfig = {
  //   plugins: [SimpleUploadAdapter],
  //   toolbar : [
  //     'heading', '|', 'bold', 'italic', 'image'
  //   ],
  //   simpleUpload : {
  //      // The URL that the images are uploaded to.
  //      uploadUrl: 'http://localhost:809/upload/three',

  //     //  // Headers sent along with the XMLHttpRequest to the upload server.
  //     //  headers: {
  //     //      'X-CSRF-TOKEN': 'CSFR-Token',
  //     //      Authorization: 'Bearer <JSON Web Token>'
  //     // }
  //   }
  // }

  TheUploadAdapterPlugin(editor) {
    console.log('TheUploadAdapterPlugin called');
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new UploadAdapter(loader, '/image');
    };
  }

  constructor(private _test: TestService, private _route:ActivatedRoute, private _router:Router) { }

  ngOnInit() {
  }

  get message(): string {
    return this._test.message;
  }

  set message(newMessage: string) {
    this._test.message = newMessage;
  }

  goServe() {
    this._router.navigateByUrl('/serve');
  }

  // getEditor() {
  //   this.Editor.create()
  // }
  public onReady( editor ) {
    editor.ui.view.toolbar.element,
    editor.ui.getEditableElement()
  };

}

class UploadAdapter {
  loader;  // your adapter communicates to CKEditor through this
  url;
  constructor(loader, url) {
    this.loader = loader;   
    this.url = url;
    console.log('Upload Adapter Constructor', this.loader, this.url);
  }

  upload() {
    return new Promise((resolve, reject) => {
      console.log('UploadAdapter upload called', this.loader, this.url);
      console.log('the file we got was', this.loader.file);
      resolve({ default: 'http://localhost:809/image/upload' });
    });
  }

  abort() {
    console.log('UploadAdapter abort');
  }
}
