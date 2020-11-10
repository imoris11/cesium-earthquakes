export const sortByMagnitude =(jsondata)  => {
    const features = [...jsondata.features]
    const sortedByMagnitude = features.sort((a, b) => b.properties.mag - a.properties.mag)
    const data = {
      bbox:jsondata.bbox,
      features: sortedByMagnitude.splice(0,100),
      metadata: jsondata.metadata,
      type: "FeatureCollection"
    }
    return data
   }