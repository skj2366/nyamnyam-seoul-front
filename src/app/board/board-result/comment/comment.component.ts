import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';
import { CommentInfo } from 'src/app/vo/comment-info';
import { StorageService } from 'src/app/common/storage.service';
import { forEach } from '@angular/router/src/utils/collection';
// import { url } from 'inspector';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  writeCoi: CommentInfo = new CommentInfo();
  writeReCoi: CommentInfo = new CommentInfo();
  cois: CommentInfo[] = new Array<CommentInfo>();
  baseCois: CommentInfo[] = new Array<CommentInfo>();
  reCois: CommentInfo[] = new Array<CommentInfo>();
  @Input() reiNum;
  isLogin: boolean = false;

  cuiNum: any = this._ss.getSession('cuiNum');

  constructor(private _cs: CommonService, private _ss: StorageService) { }

  async ngOnInit() {
    if (this.reiNum) {
      await this.getCommentList(this.reiNum);
    }
    if (this._ss.getSession('tokken')) {
      this.isLogin = true;
    }
  }

  async initCommentList() {
    this.cois = await new Array<CommentInfo>();
    this.baseCois = await new Array<CommentInfo>();
    this.reCois = await new Array<CommentInfo>();
  }

  async getCommentList(reiNum: number) {
    await this.initCommentList();
    const url = `/coi/rei/${reiNum}`;
    // this.cois = <CommentInfo[]>await this._cs.get(url).toPromise();
    this._cs.get(url).subscribe(
      res=> {
        console.log(res);
        this.cois = <CommentInfo[]>res;
        for(let coi of this.cois) {
          if(coi.subNum != 0) {
            this.reCois.push(coi);
          }else {
            this.baseCois.push(coi);
          }
        }
        console.log(this.baseCois);
        console.log(this.reCois);
      }
    )
    console.log(this.cois);
  }

  writeComment() {
    if(!this.writeCoi.coiContents) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }
    const url = '/coi';
    this.writeCoi.cuiNum = Number(this._ss.getSession('cuiNum')); // ngOninit으로 뺄까 
    this.writeCoi.reiNum = this.reiNum;
    this._cs.postJson(url, this.writeCoi).subscribe(
      res => {
        console.log(res);
        this.writeCoi = new CommentInfo();
        // this.ngOnInit();
        this.getCommentList(this.reiNum);
      }
    )
  }

  qwe(evt, coi: CommentInfo) {
    // var html = '';
    // html = '<input type="text"><button>입력</button>';
    // // document.getElementById('reComment').innerHTML = html;
    // console.log("child: ", evt.target);
    // console.log(evt.target.nextSibling);
    // evt.target.nextSibling.innerHTML = html;

    // alert(`개발중입니다. ${coi.isOpen}`);
    if (!coi.isWriteOpen) {
      coi.isWriteOpen = true;
      console.log(`${coi.coiNum}번 댓글 isOpen : ${coi.isWriteOpen}`);
      console.log(evt.target.text);
    } else {
      coi.isWriteOpen = false;
      console.log(`${coi.coiNum}번 댓글 isOpen : ${coi.isWriteOpen}`);
    }
  }

  cancleReComment(coi: CommentInfo) {
    coi.isWriteOpen = false;
    this.writeReCoi = new CommentInfo();
  }

  async writeReComment(coi: CommentInfo) {
    if(!this.writeReCoi.coiContents) {
      alert('댓글 내용을 입력해주세요');
      return;
    }else {
      const url = '/coi';
      this.writeReCoi.cuiNum = Number(this._ss.getSession('cuiNum'));
      this.writeReCoi.reiNum = this.reiNum;
      this.writeReCoi.subNum = coi.coiNum;
      await this._cs.postJson(url, this.writeReCoi).subscribe(
        res => {
          console.log(res);
          console.log(`${coi.coiNum}의 답글 달기, 내용 : ${this.writeReCoi.coiContents}`);
          this.writeReCoi = new CommentInfo();
          this.getCommentList(this.reiNum);
        }
      );
      coi.isCommentOpen = true;
    }
  }

  checkSubNum(coiNum) {
    let count = 0;
    this.reCois.forEach((re) => {
      if(re.subNum == coiNum) {
        count++;
      }
    });
    return count;
  }

  openReComment(coi) {
    coi.isCommentOpen ? coi.isCommentOpen = false : coi.isCommentOpen = true;
  }

  updateComment(type:string, coi:CommentInfo) {
    if(type == 're') {
      this.writeReCoi = coi;
    }else {
      this.writeCoi = coi;
    }
    const url = `/coi`;
    this._cs.modifyJson(url, coi).subscribe(
      res=>{
        console.log(res);
      }
    )
  }

  deleteComment(coi) {
    const url = `/coi/${coi.coiNum}`;
    // alert(coi.coiNum);
    // return;
    var confirmRes = confirm('삭제하시겠습니까?');
    if(!confirmRes) {
      return;
    }
    this._cs.delete(url).subscribe(
      res=>{
        console.log(res);
        alert('삭제되었습니다.');
        this.getCommentList(this.reiNum);
      }
    )
  }

  //test
}
