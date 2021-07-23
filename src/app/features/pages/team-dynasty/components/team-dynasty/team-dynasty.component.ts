import { Component, OnInit } from '@angular/core';
import {TreeNode} from 'primeng/api';
import {TeamDynastyService} from '../../services/team-dynasty.service';
import {take} from 'rxjs/operators';
import {HelperService} from '../../../../../core/helper/helper.service';
import {RealEstateAgentsComponent} from '../../popups/real-estate-agents/real-estate-agents.component';
import {ConstantService} from '../../../../../core/constant/constant.service';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {StoreService} from '../../../../../core/store/store.service';
import {DynastyModel} from '../../models/dynasty.model';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-team-dynasty',
  templateUrl: './team-dynasty.component.html',
  styleUrls: ['./team-dynasty.component.scss']
})
export class TeamDynastyComponent implements OnInit {
  data: TreeNode[];
  selectedNode: TreeNode;
  tree: DynastyModel;

  constructor(private dynastyService: TeamDynastyService,
              public helper: HelperService,
              private constant: ConstantService,
              private modalService: NgbModal,
              private configuration: NgbModalConfig,
              public store: StoreService,
              private toaster: ToastrService) {}

  ngOnInit(): void {
    this.configuration.centered = true;
    this.tree = {} as DynastyModel;
    this.store.updateProgressBarLoading(true);
    this.getTeamDynasty();
  }
  getTeamDynasty(): void{
    this.dynastyService.getTeamDynasty().pipe(take(1)).subscribe(res => {
      console.log(res);
      this.data = null;
      if(res.result !== null){
        this.data = this.helper.constructTree(Object.values({...res.result.network}),
          {...res.result.networkUserDetails}, {...res.result.network});
      }
      this.store.updateProgressBarLoading(false);
      }, error => {
      this.store.updateProgressBarLoading(false);
      this.helper.handleApiError(error, 'failed to retrieve team dynasty');
    });
  }
  addNode(id: string): void{
    const modalRef = this.modalService.open(RealEstateAgentsComponent, this.constant.modalOption);
    modalRef.componentInstance.parentId = id;
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        this.getTeamDynasty();
      }
    }, error => {
      console.log(error);
    });
  }
  deleteNode(id): void{
    this.dynastyService.deleteNode(id).pipe(take(1)).subscribe(res => {
      this.toaster.success(`${this.constant.toasterBellIconHTML} Real estate agent removed`, '',
        this.constant.toasterConfiguration.success);
      this.getTeamDynasty();
    }, error => {
      this.helper.handleApiError(error, 'failed to delete node');
    });
  }
}
