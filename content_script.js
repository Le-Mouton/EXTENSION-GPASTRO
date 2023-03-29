const loxoString = document.evaluate("/html/body/div[1]/div[2]/section[1]/div[1]/aside/p/text()[2]", document, null, XPathResult.STRING_TYPE, null).stringValue;
const loxiString = document.evaluate("/html/body/div[1]/div[2]/section[1]/div[1]/aside/p/text()[3]", document, null, XPathResult.STRING_TYPE, null).stringValue;
const latitudeGalactiqueString = document.evaluate("/html/body/div[1]/div[2]/section[1]/div[1]/aside/p/text()[1]", document, null, XPathResult.STRING_TYPE, null).stringValue;

let loxo = null;
let loxi = null;
let latitudeGalactique = null;

if (loxoString !== 'unknown') {
  const loxoMatch = loxoString.match(/-?\d+.?\d*/);
  if (loxoMatch) {
    loxo = parseFloat(loxoMatch[0]);
  }
}
if (loxiString !== 'unknown') {
  const loxiMatch = loxiString.match(/-?\d+.?\d*/);
  if (loxiMatch) {
    loxi = parseFloat(loxiMatch[0]);
  }
}
if (latitudeGalactiqueString !== 'unknown') {
  const latitudeGalactiqueMatch = latitudeGalactiqueString.match(/-?\d+.?\d*/);
  if (latitudeGalactiqueMatch) {
    latitudeGalactique = parseFloat(latitudeGalactiqueMatch[0]);
  }
}

const classification = classifySource(loxo, loxi, latitudeGalactique);

function classifySource(loxo, loxi, latitudeGalactique) {
  let classification = '';
  if ((loxo >= -1 && loxo <= 1) && (loxi >= -1 && loxi <= 1) && (latitudeGalactique <= -20 || latitudeGalactique >= 20)) {
    classification += 'AGN';
    }    
  if ((loxo >= -3 && loxo <= 3) && (loxi >= -3 && loxi <= 3) && (latitudeGalactique >= -20 && latitudeGalactique <= 20)) {
    classification += classification ? ', ' : '';
    classification += 'Binaire X';
    }
  if (loxo <= -2 && loxi <= -1.5 && (latitudeGalactique >= -40 && latitudeGalactique <= 40)) {
    classification += classification ? ', ' : '';
    classification += 'Étoile';
    }
  if (!classification){
    classification = 'Aucun des 3';
    }
  return classification;
}

const element = document.evaluate("/html/body/div[1]/div[2]/section[1]/div[1]/aside/p/text()[4]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (element) {
  element.textContent = `La source lumineuse peut être classée comme étant:   ${classification}`;
}