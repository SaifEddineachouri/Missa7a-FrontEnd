import { Component, OnInit, ViewChild } from "@angular/core";
import { extend, loadCldr, setCulture, Internationalization, L10n,createElement } from '@syncfusion/ej2-base';
import {
  WeekService,
  MonthService,
  WorkWeekService,
  EventSettingsModel,
  AgendaService,
  PopupOpenEventArgs,
  RenderCellEventArgs,
  getWeekLastDate,
  resetTime
} from "@syncfusion/ej2-angular-schedule";
import { DropDownList, FilteringEventArgs } from "@syncfusion/ej2-dropdowns";
import { DataManager,UrlAdaptor, Query } from "@syncfusion/ej2-data";

import { PatientService } from "src/app/services/patient.service";

setCulture('fr');

declare let require: Function;
@Component({
  selector: "app-calendar",
  providers: [WeekService, MonthService, WorkWeekService],
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  @ViewChild("scheduleObj") public scheduleObj;
  public selectedDate: Date = new Date();
  public today = new Date();
  public minDate = new Date(
    this.today.getFullYear(),
    this.today.getMonth(),
    this.today.getDate()
  );
  public showWeekend: boolean = false;

  private dataManager: DataManager = new DataManager({
    url: "http://localhost:5000/api/v1/appointments",
    crudUrl: `http://localhost:5000/api/v1/appointments/Batch`,
    adaptor: new UrlAdaptor(),
    crossDomain: true,
  });
  public eventSettings: EventSettingsModel;
  PatientsData: any;
  lock = true;

  constructor(private PatientsService: PatientService) {
    this.lock = true;
    loadCldr(
      require('/node_modules/cldr-data/supplemental/numberingSystems.json'),
      require('/node_modules/cldr-data/main/fr/ca-gregorian.json'),
      require('/node_modules/cldr-data/main/fr/currencies.json'),
      require('/node_modules/cldr-data/main/fr/numbers.json'),
      require('/node_modules/cldr-data/main/fr/timeZoneNames.json')
    );
    L10n.load({
      'fr': {
          'schedule': {
             "day": "journée",
            "week": "La semaine",
            "workWeek": "Semaine de travail",
            "month": "Mois",
            "agenda": "Ordre du jour",
            "weekAgenda": "Agenda de la semaine",
            "workWeekAgenda": "Agenda de la semaine de travail",
            "monthAgenda": "Agenda du mois",
            "today": "Aujourd'hui",
            "noEvents": "Pas d'événements",
            "emptyContainer": "Aucun événement n'est prévu ce jour-là.",
            "allDay": "Toute la journée",
            "start": "Début",
            "end": "Fin",
            "more": "plus",
            "close": "Fermer",
            "cancel": "Annuler",
            "noTitle": "(Pas de titre)",
            "delete": "Effacer",
            "deleteEvent": "Supprimer un événement",
            "deleteMultipleEvent": "Supprimer plusieurs événements",
            "selectedItems": "Articles sélectionnés",
            "deleteSeries": "Supprimer la série",
            "edit": "modifier",
            "editSeries": "Modifier la série",
            "editEvent": "Modifier l'événement",
            "createEvent": "Créer",
            "subject": "Assujettir",
            "addTitle": "Ajouter un titre",
            "moreDetails": "Plus de détails",
            "save": "sauvegarder",
            "editContent": "Voulez-vous modifier uniquement cet événement ou une série entière?",
            "deleteRecurrenceContent": "Voulez-vous supprimer uniquement cet événement ou une série entière?",
            "deleteContent": "Êtes-vous sûr de vouloir supprimer cet événement?",
            "deleteMultipleContent": "Êtes-vous sûr de vouloir supprimer les événements sélectionnés?",
            "newEvent": "Nouvel évènement",
            "title": "Titre",
            "location": "Emplacement",
            "description": "La description",
            "timezone": "Fuseau horaire",
            "startTimezone": "Début du fuseau horaire",
            "endTimezone": "Fin du fuseau horaire",
            "repeat": "Répéter",
            "saveButton": "sauvegarder",
            "cancelButton": "Annuler",
            "deleteButton": "Effacer",
            "recurrence": "Récurrence",
            "wrongPattern": "Le modèle de récurrence n'est pas valide.",
            "seriesChangeAlert": "Les modifications apportées à des instances spécifiques de cette série seront annulées et ces événements correspondront à nouveau à la série.",
            "createError": "La durée de l'événement doit être plus courte que sa fréquence. Raccourcissez la durée ou modifiez le modèle de récurrence dans l'éditeur d'événement de récurrence.",
            "recurrenceDateValidation": "Certains mois ont moins que la date sélectionnée. Pour ces mois, l'événement se produira à la dernière date du mois.",
            "sameDayAlert": "Deux occurrences du même événement ne peuvent pas se produire le même jour.",
            "editRecurrence": "Modifier la récurrence",
            "repeats": "Répète",
            "alert": "Alerte",
            "startEndError": "La date de fin sélectionnée se produit avant la date de début.",
            "invalidDateError": "La valeur de date saisie est invalide.",
            "ok": "D'accord",
            "occurrence": "Occurrence",
            "series": "Séries",
            "previous": "précédent",
            "next": "Prochain",
            "timelineDay": "Journée chronologique",
            "timelineWeek": "Semaine chronologique",
            "timelineWorkWeek": "Semaine de travail chronologique",
            "timelineMonth": "Mois de la chronologie"
        },
        "recurrenceeditor": {
            "none": "Aucun",
            "daily": "du quotidien",
            "weekly": "Hebdomadaire",
            "monthly": "Mensuel",
            "month": "Mois",
            "yearly": "Annuel",
            "never": "Jamais",
            "until": "Jusqu'à",
            "count": "Compter",
            "first": "Premier",
            "second": "Seconde",
            "third": "Troisième",
            "fourth": "Quatrième",
            "last": "Dernier",
            "repeat": "Répéter",
            "repeatEvery": "Répéter tous les",
            "on": "Répéter sur",
            "end": "Fin",
            "onDay": "journée",
            "days": "Journées)",
            "weeks": "Semaines)",
            "months": "Mois)",
            "years": "Années)",
            "every": "chaque",
            "summaryTimes": "fois)",
            "summaryOn": "sur",
            "summaryUntil": "jusqu'à",
            "summaryRepeat": "Répète",
            "summaryDay": "journées)",
            "summaryWeek": "semaines)",
            "summaryMonth": "mois)",
            "summaryYear": "années)",
            "monthWeek": "Mois Semaine",
            "monthPosition": "Position du mois",
            "monthExpander": "Mois Expander",
            "yearExpander": "Année Expander",
            "repeatInterval": "Intervalle de répétition"

        }
      }
  });
  }

  ngOnInit(): void {
    this.PatientsService.getPatients().subscribe((res: any) => {
      this.PatientsData = res.data;
    });

    this.selectedDate = new Date();
     this.eventSettings = {
       dataSource: this.dataManager,
       fields: {
         id: "Id",
         subject: { name: "Subject", title: "Objet du rendez-vous" },
         location: { name: "Location", title: "Lieu de rendez-vous" },
         description: {
           name: "Description",
          title: "Descriptif du rendez-vous",
         },
         startTime: { name: "StartTime", title: "Durée de démarrage" },
         endTime: { name: "EndTime", title: "Durée de fin" },
       },
     };
  }

  onActionBegin(args) {
    if (args.requestType === "toolbarItemRendering") {
      args.items[2].click = this.onCalendarCreated.bind(this);
    }

    if (args.requestType == "eventCreate") {
      var startTime = new Date(args.data[0].StartTime);
      if (
        this.lock &&
        new Date(startTime).setHours(0, 0, 0, 0) ==
          new Date().setHours(0, 0, 0, 0)
      ) {
        //comparing start time with today
        args.cancel = true;
      }
    }
  }

  public onRenerCell(args: RenderCellEventArgs) {
    if (args.elementType === "workCells" && args.date.getHours() === 13) {
      args.element.classList.add("e-lunch-hours");
    }
  }

  public isBreak(date: Date) {
    if (date.getHours() === 13) {
      return '<div class="e-break">Pause</div>';
    }
  }

  public onPopupOpen(args: PopupOpenEventArgs): void {
    if (["QuickInfo", "Editor"].indexOf(args.type) > -1) {
      args.cancel = this.isValidAction(args.data.StartTime);
    }

    if (args.type === "Editor") {
      if (!args.element.querySelector(".custom-field-row")) {
        // Create required custom elements in initial time
        const row: HTMLElement = createElement("div", {
          className: "custom-field-row",
        });
        const formElement: HTMLElement = args.element.querySelector(
          ".e-schedule-form"
        ) as HTMLElement;
        formElement.firstChild.insertBefore(
          row,
          args.element.querySelector(".e-title-location-row")
        );
        const container: HTMLElement = createElement("div", {
          className: "custom-field-container",
        });
        const inputEle: HTMLElement = createElement("input", {
          className: "e-field",
          attrs: { name: "patient" },
        });
        container.appendChild(inputEle);
        row.appendChild(container);
        let dropDownList: DropDownList = new DropDownList({
          dataSource: this.PatientsData,
          fields: { text: "Nom", value: "_id" },
          itemTemplate:
            "<span><span class='name'>${Nom}</span><span class ='last-name'> ${Prenom}</span></span>",
          valueTemplate:
            "<span><span class='name'>${Nom}</span><span class ='last-name'> ${Prenom}</span></span>",

          value: (args.data as Record<string, any>).EventType as string,
          floatLabelType: "Always",
          placeholder: "Select a Patient",
          // set true to allowFiltering for enable filtering supports
          allowFiltering: true,
          //Bind the filter event
          filtering: function (e: FilteringEventArgs) {
            let query = new Query();
            //frame the query based on search string with filter type.
            query =
              e.text != ""
                ? query.where("Nom", "startswith", e.text, true)
                : query;
            //pass the filter data source, filter query to updateData method.
            e.updateData(this.element.ej2_instances[0].dataSource, query);
          },
        });
        dropDownList.appendTo(inputEle);
        inputEle.setAttribute("name", "patient");
      }
    }
  }
  onRenderCell(args): void {
    if (
      ["workCells", "monthCells"].indexOf(args.elementType) > -1 &&
      resetTime(args.date).getTime() < resetTime(new Date()).getTime()
    ) {
      args.element.classList.add("e-past-dates");
    }
  }

  onCalendarCreated() {
    let container = document.querySelector(".e-schedule-toolbar-container");
    let calendar = container.querySelector(".e-calendar");
    if (!calendar || calendar) {
      setTimeout((e) => {
        // Preventing the date selection in Schedule header calendar
        calendar = container.querySelector(".e-calendar");
        let calendarObj = (calendar as any).ej2_instances[0];
        calendarObj.renderDayCell = this.onRenderCalendarCells.bind(this);
        calendarObj.refresh();
        container.classList.add("e-header-popup-visible");
      }, 1);
    }
  }

  onRenderCalendarCells(args) {
    if (this.isValidAction(args.date)) {
      args.element.classList.add("e-past-days");
    }
  }

  isValidAction(date) {
    return !(resetTime(date).getTime() >= resetTime(new Date()).getTime());
  }
}
