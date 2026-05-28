<script setup>
defineProps({
game_image: String,
game_name: String,
game_platform: String,
age_rating: String,
pricing_model: String,
popularity_index: Number
})

</script>

<template>
  <div class="GameCardContainer">
    <div class="pic_title">
      <div class="image_wrapper">
        <img 
          :src="game_image"
          alt="game_image"
          class="game_image"
        />
      </div>
      
      <h2 class="gameName">{{ game_name }}</h2>
    </div>
    <div class="game_details">
      <p class="popularityIndex"># {{ popularity_index }}</p>
      <p class="pricingModel">{{ pricing_model }}</p>
      <p class="gamePlatform">Game Platform: {{ game_platform }}</p>
      <p class="ageRating">Age Rating: {{ age_rating }}</p>
    </div>
  </div>
</template>


<style scoped>
.GameCardContainer {
  background: linear-gradient(180deg, #1f7b8a 0%, #299fb3 100%);
  border-radius: 12px; 
  padding: 20px 15px;  
  width: 210px;       
  box-sizing: border-box;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: #ffffff;
}


.pic_title {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}


.image_wrapper {
  background-color: #213970; 
  width: 100%;               
  aspect-ratio: 3 / 4;        
  border-radius: 5px;        
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;             
}

.game_image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.gameName {

  margin: 28px 0 20px 0; 
  font-size: 22px;       
  font-weight: 700;    
  line-height: 1.2;
  letter-spacing: -0.3px; 
}


.game_details {
  display: flex;
  flex-direction: column;
  gap: 4px; 
  padding-left: 6px; 
}

.game_details p {
  margin: 0;
  font-size: 15px;     
  font-weight: 400;    
  

  color: rgba(255, 255, 255, 0.88); 
  
  text-align: left;
  text-shadow: none; 
  line-height: 1.4;
}
</style>