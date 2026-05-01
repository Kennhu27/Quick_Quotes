<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { toast } from '$lib/toast.svelte';
  
  let quoteData: any = null;
  let area: number = 0;
  
  // Local state for toggling services
  let demolition = false;
  let grout = false;
  let pickup = false;
  let thin_set = false;
  
  onMount(() => {
    // Retrieve stored quote data
    const storedData = sessionStorage.getItem('quoteData');
    if (storedData) {
      quoteData = JSON.parse(storedData);
      area = quoteData.area;
      demolition = quoteData.demolition;
      grout = quoteData.grout;
      pickup = quoteData.pickup;
      thin_set = quoteData.thin_set;
    } else {
      toast.error('No quote data found. Please start over.');
      goto('/quote');
    }
  });
  
  // Helper functions for calculations
  function calculateGroutIncrements(squareFeet: number): number {
    return Math.ceil(squareFeet / 50);
  }
  
  function calculateThinSetIncrements(squareFeet: number): number {
    return Math.ceil(squareFeet / 70);
  }
  
  // Calculate totals
  function calculateBaseCost(): number {
    return area * 4;
  }
  
  function calculateDemolitionCost(): number {
    return demolition ? 100 : 0;
  }
  
  function calculateGroutCost(): number {
    if (!grout) return 0;
    return calculateGroutIncrements(area) * 4;
  }
  
  function calculatePickupCost(): number {
    return pickup ? 100 : 0;
  }
  
  function calculateThinSetCost(): number {
    if (!thin_set) return 0;
    return calculateThinSetIncrements(area) * 25;
  }
  
  function calculateTotal(): number {
    return calculateBaseCost() + 
           calculateDemolitionCost() + 
           calculateGroutCost() + 
           calculatePickupCost() + 
           calculateThinSetCost();
  }
  
  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
  
  function updateQuote() {
    // Update the stored data
    quoteData.demolition = demolition;
    quoteData.grout = grout;
    quoteData.pickup = pickup;
    quoteData.thin_set = thin_set;
    sessionStorage.setItem('quoteData', JSON.stringify(quoteData));
    toast.success('Quote updated!');
  }
  
  function startNewQuote() {
    goto('/quote');
  }
  
  function goHome() {
    goto('/');
  }
</script>

<div class="container">
  <div class="header">
    <!-- Changed from on:click to onclick -->
    <button class="home-button" onclick={goHome}>← Back to Home</button>
    <!-- Changed from on:click to onclick -->
    <button class="new-quote-button" onclick={startNewQuote}>+ New Quote</button>
  </div>
  
  <h1>Your Quote Results</h1>
  
  {#if quoteData}
    <div class="summary">
      <h2>Project Details</h2>
      <div class="summary-item">
        <span>Total Area:</span>
        <strong>{area} sq ft</strong>
      </div>
      {#if quoteData.feet_width > 0 && quoteData.feet_length > 0}
        <div class="summary-item">
          <span>Dimensions:</span>
          <strong>{quoteData.feet_width}' × {quoteData.feet_length}'</strong>
        </div>
      {/if}
    </div>
    
    <div class="services">
      <h2>Optional Services</h2>
      <p class="subtitle">Toggle services to update your quote</p>
      
      <label class="service-option">
        <input 
          type="checkbox" 
          bind:checked={demolition}
          onchange={updateQuote}
        />
        <div class="service-info">
          <strong>Demolition</strong>
          <span>$100 flat fee</span>
          <small>Remove existing flooring</small>
        </div>
      </label>
      
      <label class="service-option">
        <input 
          type="checkbox" 
          bind:checked={grout}
          onchange={updateQuote}
        />
        <div class="service-info">
          <strong>Grout</strong>
          <span>$4 per 50 sq ft increment</span>
          <small>{calculateGroutIncrements(area)} increments needed</small>
        </div>
      </label>
      
      <label class="service-option">
        <input 
          type="checkbox" 
          bind:checked={pickup}
          onchange={updateQuote}
        />
        <div class="service-info">
          <strong>Material Pickup</strong>
          <span>$100 flat fee</span>
          <small>Pick up materials from supplier</small>
        </div>
      </label>
      
      <label class="service-option">
        <input 
          type="checkbox" 
          bind:checked={thin_set}
          onchange={updateQuote}
        />
        <div class="service-info">
          <strong>Thin Set</strong>
          <span>$25 per 70 sq ft increment</span>
          <small>{calculateThinSetIncrements(area)} increments needed</small>
        </div>
      </label>
    </div>
    
    <!-- TOTAL DISPLAYED AT THE BOTTOM -->
    <div class="quote-result">
      <h2>Price Breakdown</h2>
      
      <div class="breakdown-item">
        <span>Base Cost ($4/sq ft):</span>
        <span>{formatCurrency(calculateBaseCost())}</span>
      </div>
      
      {#if demolition}
        <div class="breakdown-item">
          <span>Demolition:</span>
          <span>{formatCurrency(calculateDemolitionCost())}</span>
        </div>
      {/if}
      
      {#if grout}
        <div class="breakdown-item">
          <span>Grout ({calculateGroutIncrements(area)} × $4):</span>
          <span>{formatCurrency(calculateGroutCost())}</span>
        </div>
      {/if}
      
      {#if pickup}
        <div class="breakdown-item">
          <span>Material Pickup:</span>
          <span>{formatCurrency(calculatePickupCost())}</span>
        </div>
      {/if}
      
      {#if thin_set}
        <div class="breakdown-item">
          <span>Thin Set ({calculateThinSetIncrements(area)} × $25):</span>
          <span>{formatCurrency(calculateThinSetCost())}</span>
        </div>
      {/if}
      
      <div class="breakdown-item total">
        <span>Total:</span>
        <span>{formatCurrency(calculateTotal())}</span>
      </div>
      
      <div class="quote-actions">
        <!-- Changed from on:click to onclick -->
        <button class="print-button" onclick={() => window.print()}>
          🖨️ Print Quote
        </button>
        <!-- Changed from on:click to onclick -->
        <button class="new-quote-bottom" onclick={startNewQuote}>
          + Create Another Quote
        </button>
      </div>
    </div>
  {:else}
    <div class="loading">
      <p>Loading quote data...</p>
    </div>
  {/if}
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    gap: 1rem;
  }
  
  .home-button, .new-quote-button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
  }
  
  .home-button {
    background: none;
    color: #007bff;
  }
  
  .home-button:hover {
    text-decoration: underline;
  }
  
  .new-quote-button {
    background-color: #007bff;
    color: white;
  }
  
  .new-quote-button:hover {
    background-color: #0056b3;
  }
  
  h1 {
    color: #333;
    margin-bottom: 2rem;
  }
  
  h2 {
    color: #555;
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }
  
  .summary {
    background-color: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
  }
  
  .summary-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e9ecef;
  }
  
  .summary-item:last-child {
    border-bottom: none;
  }
  
  .services {
    margin-bottom: 2rem;
  }
  
  .subtitle {
    color: #666;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }
  
  .service-option {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    margin: 0.5rem 0;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .service-option:hover {
    background-color: #f8f9fa;
  }
  
  .service-option input {
    margin-top: 0.25rem;
  }
  
  .service-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .service-info span {
    color: #007bff;
    font-weight: 500;
  }
  
  .service-info small {
    color: #666;
    font-size: 0.85rem;
  }
  
  .quote-result {
    background-color: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    border: 2px solid #28a745;
    animation: slideUp 0.3s ease-out;
  }
  
  .breakdown-item {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 0;
    border-bottom: 1px solid #e9ecef;
  }
  
  .breakdown-item.total {
    border-top: 2px solid #dee2e6;
    border-bottom: none;
    margin-top: 0.75rem;
    padding-top: 1rem;
    font-weight: bold;
    font-size: 1.2rem;
    color: #28a745;
  }
  
  .quote-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
    justify-content: center;
  }
  
  .print-button, .new-quote-bottom {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
  }
  
  .print-button {
    background-color: #6c757d;
    color: white;
  }
  
  .print-button:hover {
    background-color: #5a6268;
  }
  
  .new-quote-bottom {
    background-color: #28a745;
    color: white;
  }
  
  .new-quote-bottom:hover {
    background-color: #218838;
  }
  
  .loading {
    text-align: center;
    padding: 3rem;
    color: #666;
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media print {
    .header, .quote-actions, .new-quote-button {
      display: none;
    }
  }
</style>
