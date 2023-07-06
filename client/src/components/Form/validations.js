export default function validations(obj) {
  const regExpImage = new RegExp(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/);

  const resultObj = {};

  if (obj.title?.length < 3)
    resultObj.title = "Se necesitan mínimo 3 caracteres";

  if (obj.summary?.length < 43)
    resultObj.summary = "Se necesitan mínimo 43 caracteres";

  if (!regExpImage.test(obj.image))
    resultObj.image = "Se necesita una url válida";

  if (+obj.healthScore < 1 || +obj.healthScore > 100)
    resultObj.healthScore = "Respete el rango <1-100>";

  return resultObj;
}
