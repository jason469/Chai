import {Component, Directive, EventEmitter, HostListener, OnInit, Output} from '@angular/core';

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
  centerLat = -31.7833;  // Midway between New Zealand and Australia
  centerLng = 159.3000;

  loading = true

  CWIMPIE_ICON_SOURCE: string = "CwimpieIconDatasource"
  TRIP_ONE_SOURCE: string = 'TripOneSource'
  MULTI_STOP_TRIP_SOURCE: string = 'MultiStopTripSource'

  CWIMPIE_ICON_BUNNY_TAG: string = "cwimpie-bunny-icon"
  CWIMPIE_ICON_POODEL_TAG: string = "cwimpie-poodel-icon"

  DUNEDIN_COORDS = [170.50361, -45.87416]
  AUCKLAND_COORDS = [174.767700, -36.850109]
  MELBOURNE_COORDS = [144.946457, -37.840935]
  SYDNEY_COORDS = [151.208755, -33.870453]

  MULTI_STOP_TRIPS_DATASOURCES_CONFIG = [
    {
      "displayName": "Dunedin To Melbourne (Trip 2)",
      "pathConfig": [
        {
          "properties": {
            "transportationMode": "boat",
            "lineStyle": "dash",
            "lineColour": "#FF0000",
            "tripName": "tripTwo",
          },
          "coordinates": [this.DUNEDIN_COORDS, this.SYDNEY_COORDS],
        },
        {
          "properties": {
            "transportationMode": "train",
            "lineStyle": "solid",
            "lineColour": "#0000FF",
            "tripName": "tripTwo",
          },
          "coordinates": [this.SYDNEY_COORDS, this.MELBOURNE_COORDS],
        },
      ],
    },
    {
      "displayName": "Dunedin To Melbourne (Trip 3)",
      "pathConfig": [
        {
          "properties": {
            "transportationMode": "plane",
            "lineStyle": "dash",
            "lineColour": "#00FF00",
            "tripName": "tripThree",
          },
          "coordinates": [this.DUNEDIN_COORDS, this.AUCKLAND_COORDS]
        },
        {
          "properties": {
            "transportationMode": "plane",
            "lineStyle": "solid",
            "lineColour": "#FFFF00",
            "tripName": "tripThree",
          },
          "coordinates": [this.AUCKLAND_COORDS, this.MELBOURNE_COORDS],
        },
      ],
    }

  ]

  LAYER_IDS: string[] = []  // Captures the layer ids of the non-multi-stop paths

  constructor(
    private viewCwimpiesService: ViewCwimpiesService,
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

  loadImage(imageUrl: string, imageSize: number, iconTagName: string) {
    this.map.loadImage(imageUrl, (error, image: any) => {
      if (error) throw error;
      this.map.addImage(iconTagName, image, {'sdf': true});
    })
  }

  async loadCwimpieIconsDatasource() {
    let cwimpieIcons: any[] = []
    this.viewCwimpiesService.getAllCwimpiesData().subscribe(allData => {
      if (allData.length != 0) {
        for (let data of allData) {
          let coords = data.primaryParentId.countryId.coordinates
          let latLngCoordinates = coords[Math.floor(Math.random() * coords.length)]
          let lngLatCoordinates = [latLngCoordinates[1], latLngCoordinates[0]]
          cwimpieIcons.push({
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": lngLatCoordinates,
            },
            "properties": {
              "name": data.name,
              "colour": data.colourId.hexCode,
              "speciesName": data.speciesId.name
            }
          })
        }
      }
      let cwimpieIconData: GeoJSON.FeatureCollection<GeoJSON.Point>
      cwimpieIconData = {
        "type": "FeatureCollection",
        "features": cwimpieIcons
      };
      (this.map.getSource(this.CWIMPIE_ICON_SOURCE) as GeoJSONSource).setData(cwimpieIconData)
    })
  }

  async loadTripOneDatasource() {
    let lineFeatures: any[] = []
    let lineCoords = [this.DUNEDIN_COORDS, this.MELBOURNE_COORDS]

    let lineProperties = {
      "transportationMode": "plane"
    }

    lineFeatures.push({
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": lineCoords
      },
      "properties": lineProperties
    });

    let TripOneData: GeoJSON.FeatureCollection<GeoJSON.LineString>
    TripOneData = {
      "type": "FeatureCollection",
      "features": lineFeatures
    };
    (this.map.getSource(this.TRIP_ONE_SOURCE) as GeoJSONSource).setData(TripOneData)
  }

  async loadMultiStopTripDatasources(tripConfigList: any[], datasourceName:string) {
    let tripDatasource: GeoJSON.FeatureCollection<GeoJSON.LineString>
    let lineFeatures: any[] = []

    for (let tripConfig of tripConfigList) {
      for (let lineConfig of tripConfig["pathConfig"]) {
        let lineProperties = lineConfig["properties"]

        lineFeatures.push({
          "type": "Feature",
          "geometry": {
            "type": "LineString",
            "coordinates": lineConfig["coordinates"]
          },
          "properties": lineProperties
        });
      }
    }
    tripDatasource = {
      "type": "FeatureCollection",
      "features": lineFeatures
    };
    (this.map.getSource(datasourceName) as GeoJSONSource).setData(tripDatasource)
  }

  async initialiseMap() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: 3,
      center: [this.centerLng, this.centerLat]
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new mapboxgl.FullscreenControl());

    // Add sources
    this.map.on('load', async () => {
      this.loadImage('/assets/icons/species/Bunny.png', 20, this.CWIMPIE_ICON_BUNNY_TAG)
      this.loadImage('/assets/icons/species/Poodel.png', 20, this.CWIMPIE_ICON_POODEL_TAG)

      // Cwimpie icons source
      this.createEmptySource(this.CWIMPIE_ICON_SOURCE, {
        'cluster': true,
        'clusterMaxZoom': 14,
        'clusterRadius': 50
      })

      // Trip one between Dunedin and Melbourne
      this.createEmptySource(this.TRIP_ONE_SOURCE, {
        'lineMetrics': true
      })

      // Datasource for all multi-stop trips
      this.createEmptySource(this.MULTI_STOP_TRIP_SOURCE, {
        'lineMetrics': true
      })

      // Cwimpie icons layers
      this.map.addLayer({
        'id': 'cwimpie-circle',
        'type': 'circle',
        'source': this.CWIMPIE_ICON_SOURCE,
        'filter': ['has', 'point_count'],
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
      this.LAYER_IDS.push('cwimpie-circle')

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
      this.LAYER_IDS.push('cwimpie-circle-label')

      this.map.addLayer({
        'id': 'cwimpie-icon',
        'type': 'symbol',
        'source': this.CWIMPIE_ICON_SOURCE,
        'filter': ['!', ['has', 'point_count']],
        'layout': {
          'icon-image': [
            "case",
            ['==', ['get', 'speciesName'], "Bunny"], this.CWIMPIE_ICON_BUNNY_TAG,
            ['==', ['get', 'speciesName'], "Poodel"], this.CWIMPIE_ICON_POODEL_TAG,
            this.CWIMPIE_ICON_BUNNY_TAG
          ],
          'icon-allow-overlap': true,
          'icon-size': 0.05
        }
      })
      this.LAYER_IDS.push('cwimpie-icon')

      this.map.on('mouseenter', 'cwimpie-circle', () => {
        this.map.getCanvas().style.cursor = 'pointer'
      })
      this.map.on('mouseleave', 'cwimpie-circle', () => {
        this.map.getCanvas().style.cursor = ''
      })

      this.map.on('click', 'cwimpie-icon', e => {
        const coordinates = [e.lngLat.lng, e.lngLat.lat]
        const name = e.features![0].properties!['name']
        const colour = e.features![0].properties!['colour']
        const speciesName = e.features![0].properties!['speciesName']

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(`
          <div>
            <div>
              ${name}
            </div>
            <div>
              ${speciesName}
            </div>
          </div>
          `)
          .addTo(this.map);
      })

      // Path between Melbourne and Dunedin layers
      this.map.addLayer({
        'id': 'tripOne-path',
        'type': 'line',
        'source': this.TRIP_ONE_SOURCE,
        'layout': {
          'line-join': 'round',
          'line-cap': 'round',
        },
        'paint': {
          'line-color': 'red',
          'line-width': 5,
          'line-opacity': 0.7,
          'line-gradient': [
            'interpolate',
            ['linear'],
            ['line-progress'],
            0,
            'blue',
            0.1,
            'royalblue',
            0.3,
            'cyan',
            0.5,
            'lime',
            0.7,
            'yellow',
            1,
            'red'
          ]
        }
      })
      this.LAYER_IDS.push('tripOne-path')

      // Create multi stop trips
      this.map.addLayer({
        'id': 'multi-stop-trip-path',
        'type': 'line',
        'source': this.MULTI_STOP_TRIP_SOURCE,
        'layout': {
          'line-join': 'round',
          'line-cap': 'round',
        },
        'paint': {
          'line-color': ['get', 'lineColour'],
          'line-width': 5,
          'line-opacity': 0.7,
        }
      })

      // Populate sources
      await this.loadCwimpieIconsDatasource()
      await this.loadTripOneDatasource()
      await this.loadMultiStopTripDatasources(this.MULTI_STOP_TRIPS_DATASOURCES_CONFIG, this.MULTI_STOP_TRIP_SOURCE)  // Populate the sources for each multi-stop source
    })
  }

  ngOnInit() {
    this.initialiseMap().then(() => {
      this.loading = false
    })
  }

}
