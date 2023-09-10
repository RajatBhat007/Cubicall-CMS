import { Component } from '@angular/core';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss']
})
export class BatchComponent {
 selectedDropdownIndustryValue:string='Select from the drop-down'
  selectedDropdownBusinessTypeValue:string='Select from the drop-down'
  activeIndexSubTab: any = 0
  activeIndexTab: any
  activeUpdateButton: boolean=false
  activeIndexSubTab0: any = 0
   functionName=[
    {
     'label':'Defuse the Bomb',
     'date': '29/07/06',
    },
    {
      'label':'Mystery Team',
      'date': '21/07/06',
    },
    {
      'label':'Triangularis',
      'date': '22/07/06',
    },
    {
      'label':' Word Search',
      'date': '23/07/06',
    },
    {
      'label':'Word Wheel',
      'date': '24/07/06',
    },
    {
      'label':'Crossword',
      'date': '26/07/06',
    },
    
]
 CmsRoleList:any=[
  {
    'label':'About Life',
    'role':"Admin Access",
    'function':'Admin Access'
  },
  {
    'label':'Baroda Global Shared Services Ltd',
    'role':"Admin Access",
    'function':'Admin Access'
  },
  {
    'label':'',
    'role':"",
    'function':''
  },
  {
    'label':'',
    'role':"",
    'function':''
  },
  {
    'label':'',
    'role':"",
    'function':''
  },
  {
    'label':'',
    'role':"",
    'function':''
  }
 ]
subtab = [
  {
  "label": 'Create Batch'
  },
  {
    "label": 'Display all Batches'
  },
  // {
  //   "label":'Function to Role Mapping'
  // }
  ]
  count = [{
    "label": 'Total:',
    "value": ''
  },
  {
    "label": 'Active:',
    "value": ''
  },
  {
    "label": 'Inactive:',
    "value": ''
  },

  ]
  filteredBatches: any[] = [];

  idOrgnization: any;
  apiData: any;
  BatchData: any;
  totalCountCmsRoleList: any;
  totalBatches: any;
  activeBatches: any;
  inactiveBatches: any;
  CmsBatchList: any;
  isActivestatus: any =[];
 

constructor(public apiservice:ApiServiceService){
console.log(this.activeUpdateButton);

}
  ngOnInit(): void {
    let body={}
    this.apiservice.createBatch(body)
 
  }

  updateSelectedIndustryValue(value: any) {
    this.selectedDropdownIndustryValue = value
  }
  updateSelectedBusinessTypeValue(value: any) {
    
    this.selectedDropdownBusinessTypeValue = value

  }
  NavigateToSubTab(index: any) {
    this.activeIndexSubTab = index
    console.log(this.activeIndexSubTab);
    
    
     if(this.activeIndexSubTab==1){
      this.apiservice.getApiData().subscribe((data) => {
        this.apiData = data;
        console.log(this.apiData);
      });
      this.idOrgnization=this.apiData?.user?.idOrganization
      this.apiservice.getBatch(this.idOrgnization).subscribe((res)=>{
        console.log(res);
        this.BatchData=res;
        this.CmsBatchList=this.BatchData[0]?.lstBatches;
        console.log(this.CmsBatchList);
        this.totalBatches = this.CmsBatchList?.length;
        console.log(this.totalBatches);

        this.count[0].value = this.totalBatches;
        console.log(this.count[0].value );


        console.log(this.CmsBatchList);
        
        this.filteredBatches = this.CmsBatchList?.reduce((filtered: any, org: { lstBatches: any[]; }) => {
          console.log(org);
          
          const batches = org?.lstBatches?.filter(batch => batch.objHeirarchyBatchesMaster.isActive === "A") || [];
          console.log(batches);
          
          return [...filtered, ...batches];
        }, []);
      

        this.count[1].value = this.activeBatches?.length;
        this.inactiveBatches = this.CmsBatchList?.objHeirarchyBatchesMaster?.filter(
          (org: { status: string }) => org.status === 'D'
        );

        this.count[2].value = this.inactiveBatches?.length;
      })
     }
  }
  selectOption(index:any){
    this.activeIndexTab=index
  }
//   setActiveTab(tabIndex: number) {
//     this.activeTab = tabIndex;
//   }
NavigateToSubTab0(index: number) {
  this.activeIndexSubTab = index;
}
createBatch(){

}


}

