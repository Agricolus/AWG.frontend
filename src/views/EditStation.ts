import Vue from "vue"
import Component from "vue-class-component";
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Datepicker from 'vuejs-datepicker';

// import * as api from "@/apis";
import { stationsService } from "@/services";
import { Prop } from 'vue-property-decorator';

@Component({
  name: "editStation",
  components: {
    LMap, LTileLayer, LMarker, LPopup, Datepicker
  }
}
)
export default class EditStation extends Vue {

  @Prop()
  stationId: string;

  stationForm = {
    name: '', //mandatory
    controlledProperty: [], //aggiungere getter //mandatory
    location: null, //mandatory
    dateInstalled: new Date(), //mandatory
    source: '',
    dataProvider: '',
    description: '',
    serialNumber: '',
    refDeviceModel: ''
  };

  get controlledProperties() {
    return ['temperature', 'humidity', 'pressure', 'weatherConditions', 'precipitation', 'windSpeed', 'windDirection', 'atmosphericPressure', 'solarRadiation']
  }

  addControlledProperty(p) {
    if (!this.isSelected(p)) {
      this.stationForm.controlledProperty.push(p)
    } else {
      let idx = this.stationForm.controlledProperty.indexOf(p);
      this.stationForm.controlledProperty.splice(idx, 1)
    }


  }

  isSelected(p) {
    return this.stationForm.controlledProperty.indexOf(p) > -1
  }

  mounted() {
    console.log('stationId', this.stationId);
  }
}
