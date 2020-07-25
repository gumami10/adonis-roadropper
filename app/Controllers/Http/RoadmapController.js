'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Roadmap = use('App/Models/Roadmap');

/**
 * Resourceful controller for interacting with roadmaps
 */
class RoadmapController {
  /**
   * Show a list of all roadmaps.
   * GET roadmaps
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {

    const roadmaps = await Roadmap
      .query()
      .with('user')
      .setHidden(['password'])
      .orderBy('id', 'desc')
      .fetch()

    return roadmaps

  }

  /**
   * Create/save a new roadmap.
   * POST roadmaps
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ auth, request }) {
    const data = request.post()

    try {
      const user = await auth.getUser()
      await Roadmap.create({ ...data, moderation: 0, creator: user.id, category: 'others', subject: 'Other' })
    } catch(e) {
      console.log('Erro: ', e)
    }
  }

  /**
   * Display a single roadmap.
   * GET roadmaps/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    try {
      return await Roadmap.findOrFail(params.id)
    } catch(e) {
      console.log('aldair', e)
    }

  }

  /**
   * Update roadmap details.
   * PUT or PATCH roadmaps/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, auth, request }) {
    const roadmap = await Roadmap.findOrFail(params.id)
    const data = request.post()

    if (roadmap.creator !== auth.user.id) {
      return response.status(401)
    }

    const result = await roadmap.save({ ...data })

    return result

  }

  /**
   * Delete a roadmap with id.
   * DELETE roadmaps/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {

    const roadmap = await Roadmap.findOrFail(params.id)

    if (roadmap.creator !== auth.user.id) {
      return response.status(401)
    }

    await roadmap.delete()

    return response.status(200)

  }
}

module.exports = RoadmapController
