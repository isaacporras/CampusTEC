import { Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  startOfWeek,
  addDays,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
} from 'angular-calendar';
import {HttpServicesService} from "../../Services/http-services.service";

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-planner',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css'],
})
export class PlannerComponent implements OnInit {
  locale: string = 'es';
  viewDate: Date = new Date();
  showMarker = false;
  weekStart: Date = startOfWeek(this.viewDate);
  receivedEvents;
  week = 1;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  constructor(private http: HttpServicesService) {}

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  updateEvents(): void{
    let receivedEvents;
    this.http.getTareas(this.week).subscribe((data) => {
      var jsonResponse = JSON.parse(JSON.stringify(data));
      console.log(data);

      var event = addHours(addDays(this.weekStart, jsonResponse.days), jsonResponse.hours);
      console.log(event)
      this.events = [
        {
          title: jsonResponse.title,
          start: event,
          end: addHours(event, 1),
          color: colors.blue,
        }
      ];
    }, (error) => {
      console.log(error);
    });
  }

  lastWeek(): void{
    if(this.week > 1){
      this.week -= 1;
    }else{
      this.week = 1;
    }
  }

  nextWeek(): void{
    if(this.week < 16){
      this.week += 1;
    }else{
      this.week = 16;
    }
  }

  ngOnInit(): void {
    this.updateEvents();
    this.refresh.next();
  }
}
