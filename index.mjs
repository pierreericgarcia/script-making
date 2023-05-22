import fs from "fs";
import clipboardy from "clipboardy";

function extractRandomDefinitionsFromFile(filePath, count) {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const definitions = fileContent
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  if (definitions.length < count) {
    console.log("Le fichier ne contient pas suffisamment de définitions.");
    return;
  }

  const randomIndexes = [];
  while (randomIndexes.length < count) {
    const randomIndex = Math.floor(Math.random() * definitions.length);
    if (!randomIndexes.includes(randomIndex)) {
      randomIndexes.push(randomIndex);
    }
  }

  const randomDefinitions = randomIndexes.map((index) => definitions[index]);
  return randomDefinitions;
}

const filePath = "definitions.txt";
const count = 25;

const randomDefinitions = extractRandomDefinitionsFromFile(filePath, count);

const getChatGPTScript = (
  definitions
) => `Salut ChatGPT ! On va jouer à un jeu et tu seras notre animateur. J'adore découvrir de nouveaux mots et je les note dans mon calepin pour essayer de m'en souvenir du sens. Cependant, j'ai souvent du mal à me rappeler des définitions précises ou des nuances associées à chaque mot. Mais tout ça, c'est du passé ! Maintenant, j'ai une nouvelle façon de m'entraîner à retenir les définitions.

Voici comment ça va fonctionner : je vais te partager une liste de tous les mots que j'ai appris jusqu'à présent en les copiant/collant ici. J'aimerais que tu les enregistres et les mémorises correctement, en corrigeant éventuellement certaines définitions s'il y a des erreurs. Une fois que tu auras fait cela, nous pourrons passer à la partie intéressante : tu me poseras une question sur un mot à la fois.

Par exemple, tu pourrais me demander : 'Quelle est la définition du mot X ?'. Je te répondrai avec ma meilleure approximation de la définition. Si ma réponse est correcte, tu me félicites et tu passes au mot suivant. Si ma réponse comporte une erreur ou est incomplète, je compte sur toi pour me corriger et m'inviter à reformuler la définition. Cela me permettra de renforcer ma mémoire et d'apprendre de façon plus efficace.

Le but est de rendre ce jeu plus ludique et interactif, en prenant le temps de se concentrer sur chaque mot individuellement.

Es-tu prêt à relever ce défi en posant les questions une par une ? 🚀

Voilà la liste de mots :

${definitions}`;

const joinedDefinitions = randomDefinitions.join("\n");

clipboardy.writeSync(getChatGPTScript(joinedDefinitions));
console.log("Le script a été copié dans votre presse-papiers. ✅");
