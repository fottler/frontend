export default class Template {

    static run(template, parameters){
        for (const [key, value] of Object.entries(parameters)) {
            template = template.split('{{'+key+'}}').join(value);
        }
        return template;
    }
    static findTemplate(templates, templateType){
        for (const value of Object.values(templates)) {
            if(value.id === templateType){
                return value.template;
            }
        }
    }
    static findTemplate2Levels(templates, templateType){
        for (const subTemplates of Object.values(templates)) {
            const template = Template.findTemplate(subTemplates, templateType);

            if(template){
                return template;
            }
        }
    }

}