(function(){
    'use strict'
             
            angular.module('webapp')

            .service('dataFactory',dataFactory);
            
            
             function dataFactory(){
                        var data = [
                            {id:1,name:"Danny", number:"1001",location:"Bentoville"},
                            {id:2,name:"Banny", number:"1002",location:"Centerton"},
                            {id:3,name:"Canny", number:"1003",location:"Rogers"},
                            {id:4,name:"Fanny", number:"1006",location:"Fort Smith"},
                            {id:5,name:"Nanny", number:"1004",location:"Fayetteville"},
                            {id:6,name:"Manny", number:"1005",location:"SpringDale"}
                    ];
                
                 var getNewId = function(){
                     if(newId){
                         newId ++;
                         return newId;
                     }else{
                         var maxId = _.max(data, function(entry){
                             return entry.newId;
                             console.log(entry.newId)
                             newId = maxId.id + 1;
                             return newId;
                         })
                     }
                 }
                        return  {
                                    getData: function(){
                                        return  data;
                                     },
                                     
                                     addData:function(entry){
                                         
                                            data.push(entry); 
                                             entry.id = getNewId();
                                                // clear input fields
                                               /* vm.data.name = ""; 
                                                vm.data.number = "";
                                                vm.data.location = ""*/
                                         console.log(entry.id)
                                        },
                            getOneProduct: function(params){
                                            var oneStore = {};
                                            angular.forEach(data, function (store) {
                                              if(store.number === parseInt(params.number))
                                                return this.store = store;
                                            }, oneStore);
                                            return oneStore.store;
                                            },
                            
                                    updateProduct: function(store){
                                            var item = this.getOneStore(store);
                                            if(!item) return false;

                                            item.name= store.name;
                                            item.number = store.number;
                                            item.location= store.location;
                                           
                                            return true
                                          }
                                    }
                    }
    
})();