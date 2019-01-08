import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //导入HttpClientModule
import { MarkerManager } from '@agm/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  
  title: string = 'Angular4 AGM Demo';
  SchoolLat: number =  22.650224;
  SchoolLng: number = 120.327815;
  zoomValue: number = 15;
  RDate = new Date();

  RegisterArray: string[][];//暂存器
  SaveArray: string[][]=[[ , , , , ,]];//坐标阵列
  OneaArray = {
    Id: [], //ID
    Latitude: [], //维度
    Longitude: [],//经度
    SrcDetail:[],//细节
    StartTime:[],//发生时间
    };

    //测试用标记
    Tmarkers: marker[] = [
      {
        id:"1",
        lat: 22.6360433,
        lng: 120.3921058,
        label: '自小客與機車發生事故',
        time:'1997',
        draggable: false
      },
      {
        id:"2",
        lat: 22.557819,
        lng: 120.3524493,
        label: '高雄市小港區大業北路和中鋼路發生交通事故',
        time:'1997',
        draggable: false
      }
    ]
   


    clickedMarker(label: string, index: number) {
      console.log(`clicked the marker: ${label || index}`)
    }
    markerDragEnd(m: marker, $event: MouseEvent) {
      console.log('dragEnd', m, $event);
    }
    
    

 
 
  
 
 
  //初始化们
  constructor(private http: HttpClient) { } 
  ngOnInit(): void { 
    this.getData();
    this.timeout();
  }
 


//http
  private _headers = {headers: new HttpHeaders().set('Authentication', 'Token')}; 








  /*
  读取api
  */
  public getData() { 
    return this.http.get('https://api.kcg.gov.tw/api/service/Get/cd8e661e-58d0-4873-b613-871cd7e06298', this._headers).subscribe(pjson=>{
      this.RegisterArray = pjson['data'];
      console.log("R");
      console.log(this.RegisterArray);
    }
    ); 
  }
  


  /*
  启动的搬移资料
  整理出如下格式
      SaveArray[][]
      0: (5) [empty × 5]
      1: (5) ["081258", "22.621187", "120.3077403", "自小客與機車發生事故", "2019/1/8 14:20:0"]
      2: (5) ["041153", "22.6360433", "120.3921058", "自小客與機車發生事故", "2019/1/8 14:28:0"]
      3: (5) ["026897", "22.645475", "120.3030279", "兩部機車", "2019/1/8 14:34:0"]
  */
  public moveData(){
   
    //console.log(this.RegisterArray);//读到的json拆出的data
    for(var i0=0;i0<this.RegisterArray.length;i0++){
      var bkflag=0;

      for(var i1=0;i1<this.SaveArray.length;i1++){
        if(this.RegisterArray[i0]['Id']==this.SaveArray[i1][0]){
          bkflag=1;
        }
        if(bkflag==1)break;
      }

      if(bkflag==1){
        bkflag=0;
        continue;}

        this.SaveArray.push([
        this.RegisterArray[i0]['Id'] ,
        Number(this.RegisterArray[i0]['Latitude']) , 
        Number(this.RegisterArray[i0]['Longitude']),
        this.RegisterArray[i0]['SrcDetail'] ,
        this.RegisterArray[i0]['StartTime'] ]);
          
    }
    console.log("S");
    console.log(this.SaveArray);
  }








  /*
  循环开始
  */
  timeout() {
    setTimeout(() => {
        //console.log(myDate+"   更新数据");
        //<循环内容
        var myDate = new Date();
        myDate.toLocaleTimeString(); 
        this.RDate=myDate;
        this.getData();//读取api
        this.moveData();//搬移资料


        //循环内容>


        this.timeout();
    }, 1000);
}


}


//定义mk
interface marker {
  id?: string;
	lat: number;
	lng: number;
	label?: string;
  draggable: boolean;
  time?: string;
}