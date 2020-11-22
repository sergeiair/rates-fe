import React, {useState} from 'react';

import promoStyles from './promo.scss';

import scr1Image from '../../../assets/promo/scr1.png';
import scr2Image from '../../../assets/promo/scr2.png';
import scr3Image from '../../../assets/promo/scr3.png';
import scr4Image from '../../../assets/promo/scr4.png';

function Promo() {
    const [value, setState] = useState({
        active: 0
    });

    return (
        <div className="d-flex flex-column ">
            <div className="d-flex justify-content-start pb-3">
                <div className={`p-2 mr-3 text-center text-small as-button ${value.active === 0 ? 'accent-bg-accent2-text' : 'accent2-bg-accent-text'}`}
                    onMouseEnter={() => setState({active: 0})}>History data</div>
                <div className={`p-2 mr-3 text-center text-small  as-button ${value.active === 1 ? 'accent-bg-accent2-text' : 'accent2-bg-accent-text'}`}
                    onMouseEnter={() => setState({active: 1})}>Prediction with ML</div>
                <div className={`p-2 mr-3 text-center text-small  as-button ${value.active === 2 ? 'accent-bg-accent2-text' : 'accent2-bg-accent-text'}`}
                    onMouseEnter={() => setState({active: 2})}>Review and analyze</div>
                <div className={`p-2 mr-3 text-center text-small  as-button ${value.active === 3 ? 'accent-bg-accent2-text' : 'accent2-bg-accent-text'}`}
                    onMouseEnter={() => setState({active: 3})}>Repeat and improve</div>
            </div>
            <div className="position-relative w-100 mt-3">
                <img src={scr1Image}
                    className={`position-absolute w-100 promo-img ${value.active === 0 ? 'promo-img--first' : ''}`}/>
                <img src={scr2Image}
                    className={`position-absolute w-100 promo-img ${value.active === 1 ? 'promo-img--first' : ''}`}/>
                <img src={scr3Image}
                    className={`position-absolute w-100 promo-img ${value.active === 2 ? 'promo-img--first' : ''}`}/>
                <img src={scr4Image}
                    className={`position-absolute w-100 promo-img ${value.active === 3 ? 'promo-img--first' : ''}`}/>
            </div>
        </div>
    )
}

Promo.propTypes = {

};

export default Promo;

