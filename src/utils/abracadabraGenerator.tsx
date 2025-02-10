function abracadabraWordGenerator(length:number) {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz1234567890';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function abracadabraPhraseGenerator(phrase:string) {
  const result: string[] = []
  const array = phrase.split(' ').forEach((world) =>{
    result.push(abracadabraWordGenerator(world.length))
  })
  return result.join(' ')
}