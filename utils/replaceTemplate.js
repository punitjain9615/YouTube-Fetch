exports.replaceTemplate = (card, element) => {
    let newCard = card.replace("{%TITLE%}", element.title);
    newCard =newCard.replace('{%IMAGE%}', element.thumbNails.high.url);
    newCard =newCard.replace("{%DATE%}",element.createdAt);
    return newCard;
};