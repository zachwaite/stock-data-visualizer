import { html } from 'lit-html';
import { getZACKSData } from '../quandl/quandl';
import { Component } from './Component';

export class RatingsComponent extends Component {
  template (data) {
    return html`
      <div id="ratingsContainer" class="ratingsContainer">
        <img class="ratings-logo-img" src="newspaper-solid.svg" alt="ratings-logo">
          <span>Zack's Analyst Ratings</span>
        </img>
      </div>
      <div id="ratingsFormContainer" class="ratingsFormContainer">
        <form id="ratingsForm">
          <input type="text"
            class="ratingsTickerInput"
            name="ratingsTickerInput" 
            id="ratingsTickerInput"
            placeholder="Enter a ticker symbol..."
            class="form-control" />
          <textarea
            class="ratingsTickerOutput"
            id="ratingsTickerOutput" >
          </textarea>
        </form>
      </div>
    `;
  }

  events() {
    return [
      {type: "click", selector: "#ratingsContainer", handler: this.toggleSlideIn },
      {type: "submit", selector: "#ratingsForm", handler: this.lookupRatings }
    ]
  }

  lookupRatings (e) {
    e.preventDefault();
    const input = document.getElementById('ratingsTickerInput');
    const outputArea = document.getElementById('ratingsTickerOutput');
    // TODO: sanitize
    const cleanInput = input.value;

    getZACKSData(cleanInput).then(data => {
      outputArea.textContent = data;
    })
  }

  toggleSlideIn (e) {
    const ratings = document.querySelector('#ratingsPanel');
    ratings.classList.toggle('in');
  }

}


