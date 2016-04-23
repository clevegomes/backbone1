// Model backbone model\


var Blog = Backbone.Model.extend({
    defaults: {
        author: "",
        title: "",
        url: "",

    }

})


//Backbone Collection


var Blogs = Backbone.Collection.extend({});

var blog1 = new Blog({

    author : 'Jack',
    title : 'Mr',
    url : 'test url',
});


var blog2 = new Blog({

    author : 'Freda',
    title : 'Mrs',
    url : 'test url2',
});


//  instantiate a Collection


var blogsCollection = new Blogs([blog1,blog2]);



//Backbone Views for one blog


var BlogView = Backbone.View.extend({
    model: new Blog(),
    tagName: "tr",
    initialize: function () {
        this.template = _.template($('.blogs-list-template').html(

        ));
    },
    events: {
        'click .edit-blog' : 'edit',
        'click .update-blog' : 'update',
        'click .cancel' : 'cancel',
        'click .delete-blog' : 'delete'
    },
    edit: function () {

        this.$('.edit-blog').hide();
        this.$('.delete-blog').hide();
        this.$('.update-blog').show();
        this.$('.cancel').show();

        var author = this.$('.author').html();
        var title = this.$('.title').html();
        var url = this.$('.url').html();

        this.$('.author').html("<input type='text' class='form-control author-update' value='"+ author +"'>");
        this.$('.title').html("<input type='text' class='form-control title-update' value='"+ title +"'>");
        this.$('.url').html("<input type='text' class='form-control url-update' value='"+ url +"'>");
    },
    update: function()
    {
      this.model.set("author",this.$('.author-update').val());
      this.model.set("title",this.$('.title-update').val());
      this.model.set("url",this.$('.url-update').val());
    },
    cancel: function(){
        BlogsView.render();
    },
    delete: function(){
        this.model.destroy();
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});




//Backbone Views for all blogs


var BlogsView = Backbone.View.extend({

    model: blogsCollection,
    el: $('.blogs-list'),
    initialize: function () {
        var self = this
        this.model.on('add',this.render,this);
        this.model.on('remove',this.render,this);
        this.model.on('change',function(){

            setTimeout(function(){
                self.render();
            },30);
            this.render
        },this);
    },
    render: function () {
        var self = this;
        this.$el.html('');
        _.each(this.model.toArray(),function(blog)
        {
            self.$el.append((new BlogView({model: blog})).render().$el);
        });

        return this;
    }

});

var BlogsView = new BlogsView();

$(document).ready(function () {


    $('.add-blog').on('click',function () {

        var blog = new Blog({
            author: $('.author-input').val(),
            title:  $('.title-input').val(),
            url:  $('.url-input').val(),
        });
        
        $('.author-input').val('');
        $('.title-input').val('');
        $('.url-input').val('');
        console.log(blog.toJSON());
        blogsCollection.add(blog);
    })

})


