import {Component, Input, OnInit} from '@angular/core';
import {TeamDynastyService} from '../../services/team-dynasty.service';
import {take} from 'rxjs/operators';
import {HelperService} from '../../../../../core/helper/helper.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {ConstantService} from '../../../../../core/constant/constant.service';
import {StoreService} from '../../../../../core/store/store.service';

@Component({
  selector: 'app-real-estate-agents',
  templateUrl: './real-estate-agents.component.html',
  styleUrls: ['./real-estate-agents.component.scss']
})
export class RealEstateAgentsComponent implements OnInit {
  @Input() parentId: string;
  members: any;
  constructor(private dynastyService: TeamDynastyService,
              public helper: HelperService,
              private activeModal: NgbActiveModal,
              private toaster: ToastrService,
              public constant: ConstantService,
              public store: StoreService) { }

  ngOnInit(): void {
    this.helper.setModal();
    this.getRealEstateAgents();
  }
  getRealEstateAgents(): void{
    this.dynastyService.getRealEstateAgents().pipe(take(1)).subscribe(res => {
      console.log(res);
      this.members = res.result;
    }, error => {
      this.helper.handleApiError(error, 'Failed to fetch Agents');
    })
  }
  addRealEstateAgent(node): void{
    this.dynastyService.addNode({userId: node._id, parentId: this.parentId}).pipe(take(1)).subscribe(res => {
      this.activeModal.close({status: 'yes'});
      this.toaster.success(`${this.constant.toasterBellIconHTML} Real Estate Agent added to tree`, '',
        this.constant.toasterConfiguration.success);
    },error => {
      this.helper.requestCall(error, 'Failed to add agent');
    })
  }
  close(): void{
    this.activeModal.close({status: 'no'});
  }
}
