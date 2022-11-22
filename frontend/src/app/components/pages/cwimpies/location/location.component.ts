import {Component, OnInit} from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import {GeoJSONSource} from 'mapbox-gl';
import {environment} from "../../../../../environments/environment";
import {ViewCwimpiesService} from "../../../../services/cwimpies/viewCwimpies.service";

import * as turf from '@turf/turf'
import {Units} from '@turf/turf'

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

  CITY_LOCATION_SOURCE: string = "CityLocationSource"

  CWIMPIE_ICON_SOURCE: string = "CwimpieIconDatasource"
  TRIP_ONE_SOURCE: string = 'TripOneSource'
  MULTI_STOP_TRIP_SOURCE: string = 'MultiStopTripSource'

  CWIMPIE_ICON_BUNNY_TAG: string = "cwimpie-bunny-icon"
  CWIMPIE_ICON_POODEL_TAG: string = "cwimpie-poodel-icon"

  DUNEDIN_COORDS = [170.50361, -45.87416]
  AUCKLAND_COORDS = [174.767700, -36.850109]
  WELLINGTON_COORDS = [174.777969, -41.276825]
  MELBOURNE_COORDS = [144.946457, -37.840935]
  SYDNEY_COORDS = [151.208755, -33.870453]
  ADELAIDE_COORDS = [138.599503, -34.921230]

  CITY_ICON_COORDINATES = [this.DUNEDIN_COORDS, this.MELBOURNE_COORDS]
  MULTI_STOP_TRIPS_DATASOURCES_CONFIG = [
    {
      "displayName": "Dunedin To Melbourne (Trip 2)",
      "pathConfig": [
        {
          "properties": {
            "transportationMode": "boat",
            "tripName": "tripTwo",
          },
          "coordinates": [this.DUNEDIN_COORDS, this.SYDNEY_COORDS],
        },
        {
          "properties": {
            "transportationMode": "train",
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
            "tripName": "tripThree",
          },
          "coordinates": [this.DUNEDIN_COORDS, this.AUCKLAND_COORDS]
        },
        {
          "properties": {
            "transportationMode": "plane",
            "tripName": "tripThree",
          },
          "coordinates": [this.AUCKLAND_COORDS, this.MELBOURNE_COORDS],
        },
      ],
    },
    {
      "displayName": "Dunedin To Melbourne (Trip 4)",
      "pathConfig": [
        {
          "properties": {
            "transportationMode": "plane",
            "tripName": "tripFour",
          },
          "coordinates": [this.DUNEDIN_COORDS, this.AUCKLAND_COORDS]
        },
        {
          "properties": {
            "transportationMode": "plane",
            "tripName": "tripFour",
          },
          "coordinates": [this.AUCKLAND_COORDS, this.WELLINGTON_COORDS],
        },
        {
          "properties": {
            "transportationMode": "plane",
            "tripName": "tripFour",
          },
          "coordinates": [this.WELLINGTON_COORDS, this.SYDNEY_COORDS],
        },
        {
          "properties": {
            "transportationMode": "plane",
            "tripName": "tripFour",
          },
          "coordinates": [this.SYDNEY_COORDS, this.ADELAIDE_COORDS],
        },
        {
          "properties": {
            "transportationMode": "plane",
            "tripName": "tripFour",
          },
          "coordinates": [this.ADELAIDE_COORDS, this.MELBOURNE_COORDS],
        },
        {
          "properties": {
            "transportationMode": "plane",
            "tripName": "tripFour",
          },
          "coordinates": [this.MELBOURNE_COORDS, this.DUNEDIN_COORDS],
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

  async loadCityLocationDatasource() {
    let features = []
    for (let coordinates of this.CITY_ICON_COORDINATES) {
      const center = coordinates
      const radius = 100;
      const options = {
        steps: 16,
        units: ("kilometers" as Units),
        properties: {}
      }
      const data = turf.circle(center, radius, options)
      features.push(data)
    }
    let cityLocationData: GeoJSON.FeatureCollection<GeoJSON.Polygon>
    cityLocationData = {
      "type": "FeatureCollection",
      "features": features
    };
    (this.map.getSource(this.CITY_LOCATION_SOURCE) as GeoJSONSource).setData(cityLocationData);
    console.log(cityLocationData)
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

  async loadMultiStopTripDatasources(tripConfigList: any[], datasourceName: string) {
    let tripDatasource: GeoJSON.FeatureCollection<GeoJSON.LineString>
    let lineFeatures: any[] = []

    for (let tripConfig of tripConfigList) {
      for (let lineConfig of tripConfig["pathConfig"]) {
        let lineProperties = lineConfig["properties"]
        const options = {
          properties: lineProperties
        }
        const curvedLine = turf.greatCircle(lineConfig["coordinates"][0], lineConfig["coordinates"][1], options)
        // const straightLine = turf.lineString(lineConfig["coordinates"], lineProperties)
        lineFeatures.push(curvedLine);
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

      // City source
      this.createEmptySource(this.CITY_LOCATION_SOURCE)

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
          'line-color': [
            "match", ['get', 'transportationMode'],
            "plane", "#FF0000",
            "boat", "#00FF00",
            "train", "#0000FF",
            "#FF0000"
          ],
          'line-width': 5,
          'line-opacity': 0.7,
          'line-dasharray': [
            "match", ['get', 'transportationMode'],
            "plane", ["literal", []],
            "boat", ["literal", [1, 2]],
            "train", ["literal", [3, 3]],
            ["literal", []]
          ],
        }
      })

      // Create city layers
      this.map.addLayer({
        'id': 'city-location-extrusion',
        'type': 'fill',
        'source': this.CITY_LOCATION_SOURCE,
        'paint': {
          'fill-color': '#9F1319',
          'fill-opacity': 0.3
        }
      });
      this.map.addLayer({
        'id': 'city-location-outline',
        'type': 'line',
        'source': this.CITY_LOCATION_SOURCE,
        'layout': {},
        'paint': {
          'line-color': '#000',
          'line-width': 2
        }
      });

      // Added 3d building layer for some depth
      this.map.addLayer(
        {
          'id': 'add-3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 13,
          'paint': {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              13,
              0,
              13.05,
              ["*", 4, ['get', 'height']]
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              13,
              0,
              13.05,
              ['get', 'height']
            ],
            'fill-extrusion-opacity': 1
          }
        },
      );

      // Populate sources
      await this.loadCwimpieIconsDatasource()
      await this.loadTripOneDatasource()
      await this.loadMultiStopTripDatasources(this.MULTI_STOP_TRIPS_DATASOURCES_CONFIG, this.MULTI_STOP_TRIP_SOURCE)  // Populate the sources for each multi-stop source
      await this.loadCityLocationDatasource()
    })
  }

  ngOnInit() {
    this.initialiseMap().then(() => {
      this.loading = false
    })
  }

}
