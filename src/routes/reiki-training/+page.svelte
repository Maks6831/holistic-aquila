<script>
  // Add any necessary imports or logic here

  import { onMount } from "svelte";

  let images = [
    {
      src: "https://placehold.co/600x400?text=Reiki+Training",
      alt: "Reiki Training",
    },
    {
      src: "https://placehold.co/600x400?text=Healing+Hands",
      alt: "Healing Hands",
    },
    {
      src: "https://placehold.co/600x400?text=Peaceful+Environment",
      alt: "Peaceful Environment",
    },
  ];

  let currentImageIndex = 0;

  onMount(() => {
    const interval = setInterval(() => {
      currentImageIndex = (currentImageIndex + 1) % images.length;
    }, 5000);

    return () => clearInterval(interval);
  });
</script>

<div class="max-w-6xl mx-auto px-4 py-12">
  <div class="mb-12 text-center">
    <h1 class="text-4xl font-bold mb-4 text-indigo-700">Reiki Training</h1>
    <p class="text-2xl text-gray-600 mb-8">
      Supporting you on your healing journey
    </p>
    <a
      href="#book"
      class="bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300"
      >Book Your Training</a
    >
  </div>

  <div class="mb-12 relative h-96 overflow-hidden rounded-lg shadow-xl">
    {#each images as image, index}
      <img
        src={image.src}
        alt={image.alt}
        class="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000"
        style="opacity: {index === currentImageIndex ? 1 : 0}"
      />
    {/each}
  </div>

  <section class="bg-white p-8 rounded-lg shadow-md">
    <h2 class="text-3xl font-semibold mb-6 text-indigo-600">
      Level 1 Reiki Training - Edinburgh
    </h2>
    <p class="text-xl mb-4 text-gray-700">
      Learn how to self heal with Reiki Level 1 Training
    </p>
    <p class="font-bold mb-4 text-indigo-800">
      2 day comprehensive Reiki Level 1 Training - Shoden
    </p>
    <p class="mb-8 text-lg text-gray-600">
      October 12th and 13th 2024 11am-5.30pm
    </p>

    <div class="mb-8 text-gray-700">
      <p class="mb-4">
        Reiki Level 1 training is designed to lay a solid foundation for
        individuals interested in practicing Reiki for their own well-being and
        potentially for others in the future. Upon completion, participants are
        considered Reiki Level 1 practitioners, equipped to utilise Reiki for
        self-healing and to share its benefits with those around them.
      </p>
    </div>

    <div class="mb-8">
      <h3 class="text-2xl font-semibold mb-4 text-indigo-600">
        What to expect?
      </h3>
      <p class="mb-4 text-gray-700">
        A two day course held in an intimate venue in Leith equipping you with
        the skills to learn about the origins of Reiki and fundamentals of self
        healing, unlike some 1 day courses I believe that more time is needed to
        digest the teachings.
      </p>
    </div>

    <div>
      <h3 class="text-2xl font-semibold mb-4 text-indigo-600">
        Topics covered include:
      </h3>
      <ul class="list-disc pl-6 mb-6 text-gray-700">
        <li>Reiki - The Universal Life Force</li>
        <li>History of Reiki</li>
        <li>The Five Reiki Principles</li>
        <li>Chakras and Energy Centers</li>
        <li>Hand Positions for Self-Treatment</li>
        <li>Reiki Attunement Process</li>
      </ul>
    </div>
  </section>

  <div id="book" class="mt-12 bg-indigo-100 p-8 rounded-lg shadow-md">
    <h3 class="text-2xl font-semibold mb-6 text-indigo-700">
      Book Your Reiki Training
    </h3>
    <!-- Add booking form or link here -->
    <p class="mb-4 text-gray-700">
      To book your Reiki training or for more information, please contact us:
    </p>
    <a href="mailto:info@example.com" class="text-indigo-600 hover:underline"
      >info@example.com</a
    >
  </div>
</div>

<div class="max-w-4xl mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-4">Reiki Training</h1>
  <p class="text-xl mb-6">Supporting you on your healing journey</p>

  <a
    href="#book"
    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >Book Here</a
  >

  <section class="mt-12">
    <h2 class="text-2xl font-semibold mb-4">
      Level 1 Reiki Training - Edinburgh
    </h2>
    <p class="mb-4">Learn how to self heal with Reiki Level 1 Training</p>
    <p class="font-bold mb-4">
      2 day comprehensive Reiki Level 1 Training - Shoden
    </p>
    <p class="mb-6">October 12th and 13th 2024 11am-5.30pm</p>

    <p class="mb-4">
      Reiki Level 1 training is designed to lay a solid foundation for
      individuals interested in practicing Reiki for their own well-being and
      potentially for others in the future. Upon completion, participants are
      considered Reiki Level 1 practitioners, equipped to utilise Reiki for
      self-healing and to share its benefits with those around them.
    </p>

    <h3 class="text-xl font-semibold mt-6 mb-2">What to expect?</h3>
    <p class="mb-4">
      A two day course held in an intimate venue in Leith equipping you with the
      skills to learn about the origins of Reiki and fundamentals of self
      healing, unlike some 1 day courses I believe that more time is needed to
      digest the teachings.
    </p>

    <h3 class="text-xl font-semibold mt-6 mb-2">Topics covered include:</h3>
    <ul class="list-disc pl-6 mb-6">
      <li>Reiki - The Universal Life Force</li>
      <li>History of Reiki</li>
      <!-- Add other topics here -->
    </ul>

    <!-- Add more sections for teacher introduction, pricing, etc. -->

    <div id="book" class="mt-8">
      <h3 class="text-xl font-semibold mb-4">Book Here</h3>
      <!-- Add booking form or link -->
    </div>
  </section>

  <section class="mt-12">
    <h2 class="text-2xl font-semibold mb-4">
      Level 2 Reiki Training, Edinburgh
    </h2>
    <p class="font-bold mb-4">Reiki Level 2 Practitioner Training</p>
    <p class="mb-6">Next dates: September 21st and 22nd 2024 11am-5.30pm</p>

    <p class="mb-4">
      Discover the next level of Reiki healing with this in-depth training.
      You'll deepen your connection to Reiki energy and learn advanced
      techniques to empower your own healing journey and confidently share this
      transformative practice with others.
    </p>

    <h3 class="text-xl font-semibold mt-6 mb-2">Course Highlights:</h3>
    <ul class="list-disc pl-6 mb-6">
      <li>Master the Reiki Level 2 symbols and their applications.</li>
      <li>Comprehensive Reiki Level 2 Manual</li>
      <!-- Add other highlights here -->
    </ul>

    <!-- Add more sections for pricing, prerequisites, etc. -->

    <div class="mt-8">
      <h3 class="text-xl font-semibold mb-4">Book Here</h3>
      <!-- Add booking form or link -->
    </div>
  </section>
</div>
