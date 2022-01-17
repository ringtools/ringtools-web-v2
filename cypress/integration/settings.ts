const nodeResponse = {
  node: {
    last_update: 1642378961,
    pub_key:
      '0380b3dbdf090cacee19eb4dc7a82630bd3de8b12608dd7bee971fb3cd2a5ae2fc',
    alias: 'RingTools',
    addresses: [
      { network: 'tcp', addr: '5.255.98.78:9735' },
      { network: 'tcp', addr: '[2a04:52c0:103:c1e3::1]:9735' },
      {
        network: 'tcp',
        addr: 'ugysme7gdc2xvoxv3f3dtt3d32ztgif5bwgco6zwh3urzqvfuij5wtqd.onion:9735',
      },
    ],
    color: '#3399ff',
    features: {
      '0': { name: 'data-loss-protect', is_required: true, is_known: true },
      '5': {
        name: 'upfront-shutdown-script',
        is_required: false,
        is_known: true,
      },
      '7': { name: 'gossip-queries', is_required: false, is_known: true },
      '9': { name: 'tlv-onion', is_required: false, is_known: true },
      '12': { name: 'static-remote-key', is_required: true, is_known: true },
      '14': { name: 'payment-addr', is_required: true, is_known: true },
      '17': { name: 'multi-path-payments', is_required: false, is_known: true },
      '19': { name: 'wumbo-channels', is_required: false, is_known: true },
      '23': {
        name: 'anchors-zero-fee-htlc-tx',
        is_required: false,
        is_known: true,
      },
      '31': { name: 'amp', is_required: false, is_known: true },
      '45': {
        name: 'explicit-commitment-type',
        is_required: false,
        is_known: true,
      },
      '2023': {
        name: 'script-enforced-lease',
        is_required: false,
        is_known: true,
      },
    },
  },
  num_channels: 6,
  total_capacity: '9200000',
  channels: [
    {
      channel_id: '785999081309470721',
      chan_point:
        '60145d386de0566db420e979472cd3322988e58589e555c06f425bcdede43c83:1',
      last_update: 1642425761,
      node1_pub:
        '025a467a7d2fe3080ec9910bac757281740033292b5c5908f73278c8e9015d762f',
      node2_pub:
        '0380b3dbdf090cacee19eb4dc7a82630bd3de8b12608dd7bee971fb3cd2a5ae2fc',
      capacity: '1000000',
      node1_policy: {
        time_lock_delta: 40,
        min_htlc: '1000',
        fee_base_msat: '0',
        fee_rate_milli_msat: '0',
        disabled: false,
        max_htlc_msat: '990000000',
        last_update: 1642386269,
      },
      node2_policy: {
        time_lock_delta: 420,
        min_htlc: '1000',
        fee_base_msat: '0',
        fee_rate_milli_msat: '150',
        disabled: false,
        max_htlc_msat: '990000000',
        last_update: 1642425761,
      },
    },
    {
      channel_id: '786125525145485312',
      chan_point:
        'c199a065220cbfbf19a653f5cc051031ace78ba881ffd48dd7850ff2c4d7d13f:0',
      last_update: 1642411282,
      node1_pub:
        '0380b3dbdf090cacee19eb4dc7a82630bd3de8b12608dd7bee971fb3cd2a5ae2fc',
      node2_pub:
        '03c1a8ccc5c83b37059a3efbb72e633c0897172f2550475b93bdc14b5ca243a0d1',
      capacity: '4000000',
      node1_policy: {
        time_lock_delta: 420,
        min_htlc: '1000',
        fee_base_msat: '0',
        fee_rate_milli_msat: '150',
        disabled: false,
        max_htlc_msat: '3960000000',
        last_update: 1642410202,
      },
      node2_policy: {
        time_lock_delta: 420,
        min_htlc: '1000',
        fee_base_msat: '0',
        fee_rate_milli_msat: '351',
        disabled: false,
        max_htlc_msat: '3960000000',
        last_update: 1642411282,
      },
    },
    {
      channel_id: '786137619798753280',
      chan_point:
        '92106f5e186cb7ac479a4702df24ddf23f472557f0f64215932ea317e927851c:0',
      last_update: 1642375361,
      node1_pub:
        '0380b3dbdf090cacee19eb4dc7a82630bd3de8b12608dd7bee971fb3cd2a5ae2fc',
      node2_pub:
        '03d6f80df785288de2fe5de19f24ba8a1db3d20647a88d0a903be9de3e7bb8fce1',
      capacity: '2000000',
      node1_policy: {
        time_lock_delta: 420,
        min_htlc: '1000',
        fee_base_msat: '0',
        fee_rate_milli_msat: '150',
        disabled: false,
        max_htlc_msat: '1980000000',
        last_update: 1642375361,
      },
      node2_policy: {
        time_lock_delta: 40,
        min_htlc: '1000',
        fee_base_msat: '200',
        fee_rate_milli_msat: '10',
        disabled: false,
        max_htlc_msat: '594000000',
        last_update: 1642355225,
      },
    },
    {
      channel_id: '786144216940806145',
      chan_point:
        '5e74e951977f3db6779a1e40ab96224647f303801c033e37fb27419d8fee3fe3:1',
      last_update: 1642427089,
      node1_pub:
        '028b06637205225f29f6daf40b4a8281eb3dd8aceace945e7b012fcc9e6a1e1b39',
      node2_pub:
        '0380b3dbdf090cacee19eb4dc7a82630bd3de8b12608dd7bee971fb3cd2a5ae2fc',
      capacity: '200000',
      node1_policy: {
        time_lock_delta: 40,
        min_htlc: '1000',
        fee_base_msat: '0',
        fee_rate_milli_msat: '150',
        disabled: false,
        max_htlc_msat: '198000000',
        last_update: 1642427089,
      },
      node2_policy: {
        time_lock_delta: 420,
        min_htlc: '1000',
        fee_base_msat: '0',
        fee_rate_milli_msat: '150',
        disabled: false,
        max_htlc_msat: '198000000',
        last_update: 1642362761,
      },
    },
    {
      channel_id: '786744550258114560',
      chan_point:
        '06357025f79f3665df3341332ac8a84399dba2a7697af9721528c99a7296018b:0',
      last_update: 1642418561,
      node1_pub:
        '0380b3dbdf090cacee19eb4dc7a82630bd3de8b12608dd7bee971fb3cd2a5ae2fc',
      node2_pub:
        '03a8ef90e092600119e57e1ae2aac06789e1346d016d56aa3f0f1c1a88e283a064',
      capacity: '1000000',
      node1_policy: {
        time_lock_delta: 420,
        min_htlc: '1000',
        fee_base_msat: '0',
        fee_rate_milli_msat: '150',
        disabled: false,
        max_htlc_msat: '990000000',
        last_update: 1642418561,
      },
      node2_policy: {
        time_lock_delta: 40,
        min_htlc: '1000',
        fee_base_msat: '0',
        fee_rate_milli_msat: '100',
        disabled: false,
        max_htlc_msat: '990000000',
        last_update: 1642401837,
      },
    },
    {
      channel_id: '786914974530469889',
      chan_point:
        '057f26f5523f508622c92e1519707eb0fc6010bb2b89fd01ea2fc231abeeb851:1',
      last_update: 1642432967,
      node1_pub:
        '0380b3dbdf090cacee19eb4dc7a82630bd3de8b12608dd7bee971fb3cd2a5ae2fc',
      node2_pub:
        '03c163e6a4573d69147bcf7b0950900b4d34227663c365b73569efc3a10d31a511',
      capacity: '1000000',
      node1_policy: {
        time_lock_delta: 420,
        min_htlc: '1000',
        fee_base_msat: '0',
        fee_rate_milli_msat: '150',
        disabled: false,
        max_htlc_msat: '990000000',
        last_update: 1642431161,
      },
      node2_policy: {
        time_lock_delta: 40,
        min_htlc: '1000',
        fee_base_msat: '0',
        fee_rate_milli_msat: '150',
        disabled: false,
        max_htlc_msat: '990000000',
        last_update: 1642432967,
      },
    },
  ],
};

describe('Settings', () => {
  beforeEach(() => {
    cy.visit('/settings');

    cy.intercept(
      {
        method: 'GET',
        url: /\/node\//,
      },
      {
        body: nodeResponse,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    ).as('nodeInfoRequest');
  });

  it('Parses the ring name correctly when it contains 5M', () => {
    cy.get('#ringName').type('#SRROF_5Msats_6thRING');
    cy.get('#parseCapacityBtn').click();
    cy.get('[name=ringSize]').should('have.value', '5000000');
  });

  it('Parses the ring name correctly when it contains 500K', () => {
    cy.get('#ringName').type('#SRROF_500Ksats_6thRING');
    cy.get('#parseCapacityBtn').click();
    cy.get('[name=ringSize]').should('have.value', '500000');
  });

  it('Can add a new node', () => {
    cy.get('[name=pubKey]').type(
      '0380b3dbdf090cacee19eb4dc7a82630bd3de8b12608dd7bee971fb3cd2a5ae2fc'
    );
    cy.get('[name=tgUsername]').type('Lorem ipsum');
    cy.get('#addNodeOwnerBtn').click();

    cy.wait('@nodeInfoRequest');

    cy.get('table tbody tr').should('have.length', 2);

    cy.get('table tbody tr:first td.node_key').should('have.text', '0380b3dbdf090cacee19eb4dc7a82630bd3de8b12608dd7bee971fb3cd2a5ae2fc');
  });

  it('Configure a ring manually', () => {
    cy.get('#ringName').type('#SRROF_5Msats_6thRING');
    cy.get('#parseCapacityBtn').click();
    
    cy.get('[name=pubKey]').type(
      '0380b3dbdf090cacee19eb4dc7a82630bd3de8b12608dd7bee971fb3cd2a5ae2fc'
    );
    cy.get('[name=tgUsername]').type('Lorem ipsum');
    cy.get('#addNodeOwnerBtn').click();

    cy.wait('@nodeInfoRequest');

    cy.get('[name=saveRingSettings]').click();

    cy.get('ul.list-group li').should('have.length', 1);
    cy.get('#navbarRingname').should('have.text', '#SRROF_5Msats_6thRING');

    
  });
});
