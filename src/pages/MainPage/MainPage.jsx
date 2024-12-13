import css from './MainPage.module.css' 
import WhyDrinkWater from '../../components/WhyDrinkWater/WhyDrinkWater'
import WaterСonsumptionTracker from '../../components/WaterСonsumptionTracker/WaterСonsumptionTracker'

export default function Main () { 
    return (
    
    <ul className={css.list}> 
    <div className={css.wrapper}> 
        <div className={css.container}>
            <li><WaterСonsumptionTracker/></li> 
        </div>
        <div >
        <li><WhyDrinkWater/></li> 
        </div>
        </div>
        </ul> 
        ) 
    }