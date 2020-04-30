import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

class CountryMap extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          restrictedCountries: []
        };
    }

    componentDidMount(){
      this.projectData(this.props);
  }

  componentWillReceiveProps(props){
      this.projectData(props);
  }

  projectData = (props) => {
    const { restrictedCountries } = props;

    this.setState({
      restrictedCountries: restrictedCountries
    })
  }

    render = () => {

      const { setContent, add, lock } = this.props;
      const { restrictedCountries } = this.state;

        return (
            <div style={{ padding: 15}}>               
              <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
                <ZoomableGroup>
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map(geo => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={restrictedCountries.includes(geo.properties.ISO_A2) ? "#8c449b" : "#D6D6DA"}
                          onMouseEnter={() => {
                            const { NAME } = geo.properties;
                          setContent(`${NAME}`);
                          }}
                          onMouseLeave={() => {
                            setContent("");
                          }}
                          onClick={() => {
                            if (!lock) {
                              add(geo.properties.ISO_A2)
                            }}}
                          style={{
                            default: {
                              outline: "none"
                            },
                            hover: {
                              fill: "#8c449b",
                              outline: "none"
                            },
                            pressed: {
                              outline: "none"
                            }
                          }}
                        />
                      ))
                    }
                  </Geographies>
                </ZoomableGroup>
              </ComposableMap>
          </div>
        )
    }

}


function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

CountryMap.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(CountryMap);

