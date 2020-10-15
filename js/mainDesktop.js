function accidentAnim(fromCount, toCount) {
  const counter = new CountUp('accident-counter', fromCount, toCount, 0, 1.5)
  const procent = accidentProcent(toCount)
  TweenMax.to('.data-accident', 2, { width: `${procent}%` })
  counter.start()
}

function policeAnim(fromCount, toCount) {
  const counter = new CountUp('police-counter', fromCount, toCount, 0, 1.5)
  const procent = policeProcent(toCount)
  TweenMax.to('.data-police', 2, { width: `${procent}%` })
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
          { from: dataAccident[generalCount - 1], to: dataAccident[generalCount] },
          { from: dataPolice[generalCount - 1], to: dataPolice[generalCount] },
        )
      }})
    }, 1000)
  }
}

function startConditionDesktop() {
  let widthAccident = accidentProcent(dataAccident[0])
  let widthPolice = policeProcent(dataPolice[0])

  new TimelineMax()
  .set('.data-accident', { width: `${widthAccident}%` })
  .set('.data-police', { width: `${widthPolice}%` })
  .from('.data-content__title', 0.5, {opacity:0, ease:Power0.easeNone})
  .from('#year-counter', 0.5, {opacity:0, ease:Power0.easeNone})
  .from('.data-accident', 0.5, {opacity:0, ease:Power0.easeNone})
  .from('.data-police', 0.5, {opacity:0, ease:Power0.easeNone, onComplete: () => {
    generalAnim(
      dataYear[0].from, 
      dataYear[0].to,
      {from: dataAccident[0], to: dataAccident[1] },
      {from: dataPolice[0], to: dataPolice[1] },
    ) 
  }})
}
