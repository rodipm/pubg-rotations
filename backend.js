const Pubgapi = require('node_modules/pubg-api');

const apiInstance = new Pubgapi('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiMzVmZjVjMC1iNmU2LTAxMzYtNTVhZS00OTdlYzljMDgyNDIiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTQwMDc1MDcxLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InB1Ymctcm90YXRpb25zIn0.wBqOY0Ue5OH707gxliuecP-aUrjIxi5l3gKuc7Y9b0A');

apiInstance.asyncType = 'observable';

apiInstance
  .searchPlayers()
  .subscribe(matches => {
    //success
  }, err => {
    //fail
  });
