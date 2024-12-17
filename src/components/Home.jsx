import React, { useState } from "react";
import "./Home.css"
import Frame from '../assets/Frame.png';
import Frame1 from '../assets/Frame1.png';
import Frame2 from '../assets/Frame2.png';
import Navbar from './Navbar'
import CategoryPage from "./CategoryPage";
import RecipeDetailsPage from "./RecipeDetailsPage";

const Home = () => {
   const [selectedMealId, setSelectedMealId] = useState(null);
  return (
    <>
    
    <div className='home-container'>
    <Navbar/>
    <div className='home-head'>
    <h1>Be the chef of your
    <br/> own kitchen</h1><br/>
    <h3>From Breakfast to Dinner, We have you covered</h3>
    </div>
 
        <div className='home-image'>
        <div className='grain'>
          <img className='im1' src={Frame} alt='grain' />
          <img className='im2' src={Frame1} alt='grain'/>
          
          </div>
            
            <div className='grains'>
          <img className='im3' src={Frame2} alt='background'/>
          </div>
        </div>
    </div>
    <div>
        {selectedMealId ? (
          <RecipeDetailsPage
            mealId={selectedMealId}
            onBack={() => setSelectedMealId(null)}
          />
        ) : (
          <CategoryPage onMealSelect={setSelectedMealId} />
        )}
      </div>
    </>
  )
}

export default Home