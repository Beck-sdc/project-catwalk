/* eslint-disable react/prop-types */
import React from 'react';
import {Row} from 'react-bootstrap';

const CharBreakdown = (props) => {
    let chars = props.metadata.characteristics
    //console.log('chars', props.metadata.characteristics)
    if (chars !== undefined) {
        return (
            <div className="charBreakdown" >
                <h5>Characteristics</h5>
                    <br></br>
                <div className="char-bar">
                    {chars.Size ?
                    <Row>
                        <h6>Size</h6>
                        <input id="charRange" type="range" min="1" max="5" value={!chars.Size.value ? "1" : chars.Size.value} readOnly/>
                        <div className="charTicks">
                            <p>Small</p>
                            <p>Perfect</p>
                            <p>Big</p>
                        </div>
                    </Row>
                    : null }
                    {/* <br></br> */}
                    {chars.Width ?
                    <Row >
                        <h6>Width</h6>
                        <input id="charRange" type="range" min="1" max="5" value={!chars.Width.value ? "1" : chars.Width.value} readOnly/>
                        <div className="charTicks">
                            <p>Narrow</p>
                            <p>Ok</p>
                            <p>Wide</p>
                        </div>
                    </Row>
                    : null }
                    {/* <br></br> */}
                    {chars.Comfort ?
                    <Row >
                        <h6>Comfort</h6>
                        <input id="charRange" type="range" min="1" max="5" value={!chars.Comfort.value ? "1" : chars.Comfort.value} readOnly/>
                        <div className="charTicks">
                            <p>Poor</p>
                            <p>Ok</p>
                            <p>Perfect</p>
                        </div>
                    </Row>
                    : null }
                    {/* <br></br> */}
                    {chars.Quality ?
                    <Row >
                        <h6>Quality</h6>
                        <input id="charRange" type="range" min="1" max="5" value={!chars.Quality.value ? "1" : chars.Quality.value} readOnly/>
                        <div className="charTicks">
                            <p>Poor</p>
                            <p>Ok</p>
                            <p>Perfect</p>
                        </div>
                    </Row>
                    : null }
                    {/* <br></br> */}
                    {chars.Length ?
                    <Row >
                        <h6>Length</h6>
                        <input id="charRange" type="range" min="1" max="5" value={!chars.Length.value ? "1" : chars.Length.value} readOnly/>
                        <div className="charTicks">
                            <p>Short</p>
                            <p>Perfect</p>
                            <p>Long</p>
                        </div>
                    </Row>
                    : null }
                    {/* <br></br> */}
                    {chars.Fit ?
                    <Row >
                        <h6>Fit</h6>
                        <input id="charRange" type="range" min="1" max="5" value={!chars.Fit.value ? "1" : chars.Fit.value} readOnly/>
                        <div className="charTicks">
                            <p>Tight</p>
                            <p>Perfect</p>
                            <p>Long</p>
                        </div>
                    </Row>
                    : null }
                </div>
            </div>
        )
    } else {
        return (
            <div>Product breakdown not available</div>
        )
    }
}

export default CharBreakdown;