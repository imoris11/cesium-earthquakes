import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './components/Card';
import moment from 'moment';
import { sortByMagnitude } from './helpers';

describe('Card Component', ()=> {
  const ITEM = {
    properties: {
      place: "Yenagoa, Bayelsa",
      updated: 1603409252040,
      mag: 2.1,
      detail: 'https://www.facebook.com'
    }
  }

  test('it renders view link', () => {
    render(<Card item={ITEM} />);
    const linkElement = screen.getByText(/View Json/)
    expect(linkElement).toBeInTheDocument();
  });

  test('it renders place', () => {
    render(<Card item={ITEM} />);
    const placeElement = screen.getByText(ITEM.properties.place)
    expect(placeElement).toBeInTheDocument();
  });

  test('it renders magnitude', () => {
    render(<Card item={ITEM} />);
    const magText = screen.getByText(`Mag: ${ITEM.properties.mag}`)
    expect(magText).toBeInTheDocument();
  });

  test('it renders time tag', () => {
    render(<Card item={ITEM} />);
    const timeElement = screen.getByText(`Updated: ${moment(ITEM.properties.updated).format('LL')}` )
    expect(timeElement).toBeInTheDocument();
  });
})

describe("SortByMagnitude", ()=> {
  const JSONDATA = {
    bbox:{},
    features: [
      {
        properties:{
          place: "Yenagoa, Bayelsa",
          updated: 1603409252040,
          mag: 2.1,
          detail: 'https://www.facebook.com'
        }
      },
      {
        properties:{
          place: "Yenagoa, Bayelsa",
          updated: 1603409252040,
          mag: 4.1,
          detail: 'https://www.facebook.com'
        }
      },
      {
        properties:{
          place: "Yenagoa, Bayelsa",
          updated: 1603409252040,
          mag: 5.1,
          detail: 'https://www.facebook.com'
        }
      },
      {
        properties:{
          place: "Yenagoa, Bayelsa",
          updated: 1603409252040,
          mag: 1.1,
          detail: 'https://www.facebook.com'
        }
      },

    ],
    metadata: {},
    type: "FeatureCollection"
  }
  test("it returns same number of data after sorting", ()=> {
    const result = sortByMagnitude(JSONDATA)
    expect(result.features.length).toEqual(JSONDATA.features.length)
  })

  test("it returns same type", ()=> {
    const result = sortByMagnitude(JSONDATA)
    expect(result.type).toEqual(JSONDATA.type)
  })

  test("it returns sorted features", ()=> {
    const FIRST =   {
      properties:{
        place: "Yenagoa, Bayelsa",
        updated: 1603409252040,
        mag: 5.1,
        detail: 'https://www.facebook.com'
      }
    }

    const LAST = {
      properties:{
        place: "Yenagoa, Bayelsa",
        updated: 1603409252040,
        mag: 1.1,
        detail: 'https://www.facebook.com'
      }
    }
    const result = sortByMagnitude(JSONDATA)
    expect(result.features[0]).toEqual(FIRST)
    expect(result.features[JSONDATA.features.length-1]).toEqual(LAST)
  })
 
})
