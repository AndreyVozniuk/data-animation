function startConditionMobile() {
  let heightAccident = accidentProcent(dataAccident[0])
  let heightPolice = policeProcent(dataPolice[0])

  new TimelineMax()
  .set('#accident-block', {height:heightAccident})
  .set('#police-block', {height:heightPolice})
  .from('#year-counter', 0.5, {opacity:0, ease:Power0.easeNone})
  .from('.data-accident, #accident-text', 0.5, {opacity:0, ease:Power0.easeNone})
  .from('.data-police, #police-text', 0.5, {opacity:0, ease:Power0.easeNone, onComplete: () => {
    generalAnim(
      dataYear[0].from, 
      dataYear[0].to,
      {from: dataAccident[0], to: dataAccident[1] },
      {from: dataPolice[0], to: dataPolice[1] },
    ) 
  }})
}

function accidentAnim(fromCount, toCount) {
  const counter = new CountUp('accident-counter', fromCount, toCount, 0, 1.5)
  const procent = accidentProcent(toCount)
  TweenMax.to('#accident-block', 2, { height: `${procent}%`, transformOrigin:'50% 100%' })
  counter.start()
}

function policeAnim(fromCount, toCount) {
  const counter = new CountUp('police-counter', fromCount, toCount, 0, 1.5)
  const procent = policeProcent(toCount)
  TweenMax.to('#police-block', 2, { height: `${procent}%`, transformOrigin:'50% 100%' })
  counter.start()
}

let generalCount = 1
function generalAnim(startNum, endNum, accidentData, policeData) {
  if(generalCount > 14){
    return 
  }else{
    new CountUp('year-counter', startNum, endNum, 0, 1.5).start()

    setTimeout(() => {
      accidentAnim(accidentData.from, accidentData.to)
      policeAnim(policeData.from, policeData.to)
      TweenMax.to('#year-counter', 1, {onComplete: () => {
        generalCount++
        generalAnim(
          dataYear[generalCount - 1].from, 
          dataYear[generalCount - 1].to,
          {from: dataAccident[generalCount - 1], to: dataAccident[generalCount] },
          {from: dataPolice[generalCount - 1], to: dataPolice[generalCount] },
        )
      }})
    }, 1000)
  }
}