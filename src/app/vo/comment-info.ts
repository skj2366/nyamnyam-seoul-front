export class CommentInfo {
    coiNum : number;
    subNum : number;
    coiContents : string;
    coiCredat : string;
    coiCretim : string;
    coiModdat : string;
    coiModtim : string;

    cuiNum : number;
    reiNum : number;

    cuiId: string;
    reiTitle : string;
    relName: string;

    isWriteOpen: boolean = false;
    isCommentOpen: boolean = false;
    
    /*
    private Integer coiNum;
	private Integer subNum;
	private String coiContents;
	private String coiCredat;
	private String coiCretim;
	
	private Integer cuiNum; //FK_유저
	private Integer reiNum; //FK_후기
    */

}