const mongoose = require("mongoose");
const Pet = require("./models/Pet"); // Adjust path if needed

mongoose.connect("mongodb://localhost:27017/registrationForm", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const pets = [
  {
    name: "Bella",
    age: "2 years",
    breed: "Labrador",
    weight: "25 kg",
    color: "Golden",
    species: "Dog",
    image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?fit=crop&w=400&q=80",
    available: true
  },
  {
    name: "Milo",
    age: "1.5 years",
    breed: "Persian",
    weight: "5 kg",
    color: "White",
    species: "Cat",
    image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?fit=crop&w=400&q=80",
    available: true
  },
  {
    name: "Coco",
    age: "1 year",
    breed: "Beagle",
    weight: "12 kg",
    color: "Brown/White",
    species: "Dog",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?fit=crop&w=400&q=80",
    available: true
  },
    {
      name: "Bella",
      age: "2 years",
      breed: "Labrador",
      weight: "25 kg",
      color: "Golden",
      species: "Dog",
      image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?fit=crop&w=400&q=80",
      available: true
    },
    {
      name: "Milo",
      age: "1.5 years",
      breed: "Persian",
      weight: "5 kg",
      color: "White",
      species: "Cat",
      image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?fit=crop&w=400&q=80",
      available: true
    },
    {
      name: "Coco",
      age: "1 year",
      breed: "Beagle",
      weight: "12 kg",
      color: "Brown/White",
      species: "Dog",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?fit=crop&w=400&q=80",
      available: true
    },
    {
      name: "Luna",
      age: "3 years",
      breed: "Siberian Husky",
      weight: "20 kg",
      color: "Black/White",
      species: "Dog",
      image: "https://images.unsplash.com/photo-1583512603879-5c5c6d48ec2d?fit=crop&w=400&q=80",
      available: true
    },
    {
      name: "Simba",
      age: "2 years",
      breed: "Maine Coon",
      weight: "7 kg",
      color: "Brown Tabby",
      species: "Cat",
      image: "https://images.unsplash.com/photo-1601758123927-1969083c98e0?fit=crop&w=400&q=80",
      available: true
    },
    {
      name: "Rocky",
      age: "4 years",
      breed: "German Shepherd",
      weight: "30 kg",
      color: "Black/Tan",
      species: "Dog",
      image: "https://images.unsplash.com/photo-1596496034795-23fd73a658b7?fit=crop&w=400&q=80",
      available: true
    },
    {
      name: "Lily",
      age: "1 year",
      breed: "Siamese",
      weight: "4.5 kg",
      color: "Cream/Gray",
      species: "Cat",
      image: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?fit=crop&w=400&q=80",
      available: true
    },
    {
      name: "Charlie",
      age: "5 years",
      breed: "Golden Retriever",
      weight: "28 kg",
      color: "Golden",
      species: "Dog",
      image: "https://images.unsplash.com/photo-1601758064222-52c33ef54a0e?fit=crop&w=400&q=80",
      available: true
    },
    {
      name: "Nala",
      age: "2.5 years",
      breed: "Bengal",
      weight: "6 kg",
      color: "Spotted",
      species: "Cat",
      image: "https://images.unsplash.com/photo-1621362284011-d220df4f7eae?fit=crop&w=400&q=80",
      available: true
    },
    {
      name: "Max",
      age: "3 years",
      breed: "Pug",
      weight: "8 kg",
      color: "Fawn",
      species: "Dog",
      image: "https://images.unsplash.com/photo-1583511655585-12c8b2f4a6c1?fit=crop&w=400&q=80",
      available: true
    }
];

const seedDB = async () => {
  await Pet.deleteMany({});
  await Pet.insertMany(pets);
  console.log("✅ Pets seeded successfully!");
  mongoose.connection.close();
};

seedDB();
