/* global describe it before ethers */

const {
  getSelectors,
  FacetCutAction,
  removeSelectors,
  findAddressPositionInFacets
} = require('../scripts/libraries/diamond.js')

const { deployDiamond } = require('../scripts/deploy.js')

const { assert } = require('chai')

describe('DiamondTest', async function () {
  let diamondAddress
  let diamondCutFacet
  let diamondLoupeFacet
  let ownershipFacet
  let tx
  let receipt
  let result
  const addresses = []

  before(async function () {
    diamondAddress = await deployDiamond()
    diamondCutFacet = await ethers.getContractAt('DiamondCutFacet', diamondAddress)
    diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', diamondAddress)
    ownershipFacet = await ethers.getContractAt('OwnershipFacet', diamondAddress)
    storeFacet = await ethers.getContractAt('StoreFacet', diamondAddress)
    storeIndexFacet = await ethers.getContractAt('StoreIndexFacet', diamondAddress)
    storeCommentsFacet = await ethers.getContractAt('StoreCommentsFacet', diamondAddress)
  })

  it('should have all facets -- call to facetAddresses function', async () => {
    for (const address of await diamondLoupeFacet.facetAddresses()) {
      addresses.push(address)
    }

    assert.equal(addresses.length, 6)
  })

  it('should do a facet call - init theme', async () => {
    const storeFacet = await ethers.getContractAt('StoreFacet', diamondAddress)
    await storeFacet.init()
    let theme = await storeFacet.getTheme()
    assert.equal(theme.background, 'white');
    assert.equal(theme.primary, 'indigo');
    assert.equal(theme.text, 'black');
  })

  it('should do a cross-facet calls', async () => {
    const storeFacet = await ethers.getContractAt('StoreFacet', diamondAddress)
    await storeFacet.useCommentsForSomething();

    const storeCommentsFacet = await ethers.getContractAt('StoreCommentsFacet', diamondAddress)

    let someData = await storeCommentsFacet.getSomeData()
    assert.equal(someData.someId, 1);
    assert.equal(someData.someDate, 'call doSomethingWithComments');
    
  })

})
