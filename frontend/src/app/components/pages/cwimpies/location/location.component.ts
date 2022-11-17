import {Component, OnInit} from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import {GeoJSONSource} from 'mapbox-gl';
import {environment} from "../../../../../environments/environment";
import {ViewCwimpiesService} from "../../../../services/cwimpies/viewCwimpies.service";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = -31.7833;  // Midway between New Zealand and Australia
  lng = 159.3000;

  CWIMPIE_ICON_SOURCE: string = "CwimpieIconDatasource"
  CWIMPIE_ICON_TAG: string = "cwimpie-icon"

  constructor(
    private viewCwimpiesService: ViewCwimpiesService
  ) {
  }

  createEmptySource(sourceName: string, additionalArgs: any = {}) {
    let basicSource = {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': []

      }
    }

    this.map.addSource(sourceName, {
      ...basicSource,
      ...additionalArgs
    })
  }

  loadImage(imageUrl:string, imageSize:number, iconTagName:string) {
    this.map.loadImage(imageUrl, (error, image:any) => {
      if (error) throw error;
      this.map.addImage(iconTagName, image, {'sdf': true});
    })
  }

  loadCwimpieIcons() {
    let cwimpieIcons: any[] = []
    this.viewCwimpiesService.getAllCwimpiesData().subscribe(allData => {
      if (allData.length != 0) {
        console.log(allData)
        for (let data of allData) {
          let coordinates = data.primaryParentId.countryId.coordinates
          cwimpieIcons.push({
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": coordinates[Math.floor(Math.random() * coordinates.length)]
            },
            "properties": {
              "name": data.name,
              "colour": data.colourId.hexCode
            }
          })
        }
      }
      let cwimpieIconData: GeoJSON.FeatureCollection<GeoJSON.Geometry>
      cwimpieIconData = {
        "type": "FeatureCollection",
        "features": cwimpieIcons
      };
      (this.map.getSource(this.CWIMPIE_ICON_SOURCE) as GeoJSONSource).setData(cwimpieIconData)
    })
  }

  ngOnInit() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: 3,
      center: [this.lng, this.lat]
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new mapboxgl.FullscreenControl());

    // Add sources
    this.map.on('load', () => {
      this.loadImage(BunnyImage, 20, this.CWIMPIE_ICON_TAG)

      // Cwimpie icons
      this.createEmptySource(this.CWIMPIE_ICON_SOURCE, {
        'cluster': true,
        'clusterMaxZoom': 14,
        'clusterRadius': 50
      })
      this.loadCwimpieIcons()
      this.map.addLayer({
        'id': 'cwimpie-circle',
        'type': 'circle',
        'source': this.CWIMPIE_ICON_SOURCE,
        'paint': {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            3,
            '#f1f075',
            5,
            '#db4053'
          ],
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['get', 'point_count'],
            0,
            20,
            2,
            30,
            5,
            40
          ],
          'circle-stroke-color': 'white',
          'circle-stroke-width': 1,
        }
      });
      this.map.addLayer({
        'id': 'cwimpie-circle-label',
        'type': 'symbol',
        'source': this.CWIMPIE_ICON_SOURCE,
        'filter': ['has', 'point_count'],
        'layout': {
          'text-field': [
            'format',
            ['to-string', ['get', 'point_count']],
            {'font-scale': 0.8}
          ],
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        },
      });
      this.map.on('mouseenter', 'cwimpie-circle', () => {
        this.map.getCanvas().style.cursor = 'pointer'
      })
      this.map.on('mouseleave', 'cwimpie-circle', () => {
        this.map.getCanvas().style.cursor = ''
      })

      this.map.on('click', 'cwimpie-circle-label', e => {
        console.log(e)
        // const cwimpieCoords = e.features![0].geometry.coordinates.slice()
        // const name = e.features![0].properties!['name']
        // const colour = e.features![0].properties!['colour']

        // while (Math.abs(e.lngLat.lng - ))
      })
    })

  }

}
