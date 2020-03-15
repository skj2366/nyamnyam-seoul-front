import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';
import { CommentInfo } from 'src/app/vo/comment-info';
import { StorageService } from 'src/app/common/storage.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  
  writeCoi: CommentInfo = new CommentInfo();
  cois: CommentInfo[] = new Array();
  @Input() reiNum;
  isLogin: boolean = false;

  constructor(private _cs:CommonService, private _ss:StorageService) { }

  async ngOnInit() {
    if(this.reiNum) {
      await this.getCommentList(this.reiNum);
    }
    if(this._ss.getSession('tokken')) {
      this.isLogin = true;
    }
  }

  async getCommentList(reiNum: number) {
    const url = `/coi/rei/${reiNum}`;
    this.cois = <CommentInfo[]> await this._cs.get(url).toPromise();
    console.log(this.cois);
  }

  writeComment() {
    const url = '/coi';
    this.writeCoi.cuiNum = Number(this._ss.getSession('cuiNum')); // ngOninit으로 뺄까 
    this.writeCoi.reiNum = this.reiNum;
    this._cs.postJson(url, this.writeCoi).subscribe(
      res=> {
        console.log(res);
        this.writeCoi = new CommentInfo();
        this.ngOnInit();
      }
    )
  }

  qwe(evt, coiNum:number) {
    // var html = '';
    // html = '<input type="text"><button>입력</button>';
    // // document.getElementById('reComment').innerHTML = html;
    // console.log("child: ", evt.target);
    // console.log(evt.target.nextSibling);
    // evt.target.nextSibling.innerHTML = html;
    alert(`개발중입니다. ${coiNum}`);
  }

}
