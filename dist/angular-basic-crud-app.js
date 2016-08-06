      (function(){
            angular.module('webapp', ['ui.bootstrap']);

                                  
        })();
      (function(){
           'use strict';
           
            angular.module('webapp')

                .controller('MainCtlr',MainCtlr)
                .controller('DeleteModalCtrl',DeleteModalCtrl);
            
                            
              
            
         function MainCtlr($uibModal,dataFactory){
                    var vm = this;
                    vm.animationsEnabled = true;
                    vm.data = [];
                    
                    //data model
                    vm.data= dataFactory.getData();
                    
             
                    // add store function
                    /*vm.addStore = function(){
                        
                        vm.add = {id:0, name:vm.data.name, number:vm.data.number, location:vm.data.location };
                        
                       dataFactory.addData(vm.add);
                        
                        console.log(vm.add);*/
                        
                       /*vm.data.push({
                           name:vm.data.name, 
                           number:vm.data.number,
                           location:vm.data.location 
                       }); 
                        
                        // clear input fields
                        vm.data.name = ""; 
                        vm.data.number = "";
                        vm.data.location = ""
                        */
                        
                   // }
                    
                    // sort functionality
                       vm.sortType = 'name';
                            vm.reverse = false;
                            vm.sortFunc = function(sortType) {
                                vm.reverse = (vm.sortType === sortType) ? !vm.reverse : false;
                                vm.sortType = sortType;
                            };
                    
              
                  	// Only search certain properties
                    vm.search = function (row) {
                     
                        return (
                            angular.lowercase(row.name).indexOf(vm.query || '') !== -1 || 
                            angular.uppercase(row.name).indexOf(vm.query || '') !== -1 || 
                            angular.uppercase(row.number).indexOf(vm.query || '') !== -1 || 
                            angular.lowercase(row.number).indexOf(vm.query || '') !== -1);
                        
                    };
                    
                    // show/hide add storform
                    vm.hideForm = false;
                    vm.hideFormFunc = function(){
                        vm.hideForm = !vm.hideForm;
                        
                        // clear input fields
                        vm.data.name = ""; 
                        vm.data.number = "";
                        vm.data.location ="";
                        
                    };
                    
                    // delete items
                    /* vm.deleteStore = function(index) {
                          vm.data.splice(index, 1);
                      }*/
                     
                      // edit items
                    
                   // vm.number = dataFactory.getOneProduct({number: params.number});
                
                    vm.editProduct = function(number){
                     dataFactory.updateProduct(vm.number);
                      //$state.go('products');
                        console.log();
                    };
                    
                      // create model
                    vm.createModal = createModal;
                    function createModal() {
                   
                        $uibModal.open({
                          templateUrl: 'templates/create-modal.html',
                          controller: ['$uibModalInstance','data', CreateModalCtrl],
                          controllerAs: 'vm',
                          resolve: {
                            data: function () { return  vm.data; }
                            //  ,e: function() { return store; }
                          }
                        });
                   
                      }
                    
                    // delete model
                    vm.deleteModal = deleteModal;
                    function deleteModal(store) {
                   
                        $uibModal.open({
                          templateUrl: 'templates/delete-modal.html',
                          controller: ['$uibModalInstance','data', 'store', DeleteModalCtrl],
                          controllerAs: 'vm',
                          resolve: {
                            data: function () { return  vm.data; },
                            store: function() { return store; }
                          }
                        });
                   
                      }
        }
         
          
            //Create Modal Ctrl
            function CreateModalCtrl( $uibModalInstance,  data, store) {
                  var vm = this;
              
                  vm.store = store;
                 // vm.addStore = addStore;
                 vm.add = {id:0, name:data.name, number:data.number, location:data.location };
                
                   vm.addStore = function(){            
                        
                       data.push(vm.add);
                        
                        $uibModalInstance.close();
                  };
                }
           
          //DeleteModalCtrl
            function DeleteModalCtrl( $uibModalInstance,  data, store) {
                  var vm = this;
              
                  vm.store = store;
                  vm.deleteStore = deleteStore;
                 
                  function deleteStore() {
                        data.splice(data.indexOf(store), 1);
                        $uibModalInstance.close();
                  }
                }
          
          
           
        })();
/*global angular */

/**
 * Directive that executes an expression when the element it is applied to gets
 * an `escape` keydown event.
 */
(function(){
    'use strict';
             
            angular.module('webapp')
	.directive('todoEscape', function () {
		
		var ESCAPE_KEY = 27;

		return function (scope, elem, attrs) {
			elem.bind('keydown', function (event) {
				if (event.keyCode === ESCAPE_KEY) {
					scope.$apply(attrs.todoEscape);
				}
			});

			scope.$on('$destroy', function () {
				elem.unbind('keydown');
			});
		};
	});
})();
(function(){
    'use strict';
             
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
                                    newId = maxId.id + 1;
                             return newId;
                         });
                     }
                 };
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
                                           
                                            return true;
                                          }
                                    };
                    }
    
})();